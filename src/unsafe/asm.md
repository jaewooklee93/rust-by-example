## 인라인 어셈블리

Rust는 `asm!` 맥로를 통해 인라인 어셈블리에 대한 지원을 제공합니다.
컴파일러가 생성하는 어셈블리 출력에 직접 작성한 어셈블리를 포함시킬 수 있습니다.
일반적으로는 필요하지 않지만, 다른 방법으로 달성할 수 없는 성능이나 타이밍이 요구되는 경우에 유용할 수 있습니다.
커널 코드와 같이 저수준 하드웨어 프라이미티브에 액세스해야 할 때도 필요할 수 있습니다.

> **참고**: 여기서는 x86/x86-64 어셈블리로 예제를 제공하지만, 다른 아키텍처도 지원됩니다.

인라인 어셈블리는 다음 아키텍처에서 지원됩니다.
- x86 및 x86-64
- ARM
- AArch64
- RISC-V

## 기본 사용법

가장 간단한 예제부터 시작해 보겠습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

unsafe {
    asm!("nop");
}
# }
```

이 코드는 컴파일러가 생성하는 어셈블리에 NOP(no operation) 지시어를 삽입합니다.
모든 `asm!` 호출은 `unsafe` 블록 내에서 있어야 합니다. 왜냐하면 이들은 임의의 지시어를 삽입하여 다양한 불변성을 깨뜨릴 수 있기 때문입니다. 삽입할 지시어는 `asm!` 맥로의 첫 번째 인수로 문자열 리터럴로 지정됩니다.

## 입력 및 출력

아무것도 하지 않는 지시어를 삽입하는 것은 지루합니다. 실제 데이터에 작용하는 것을 해 보겠습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let x: u64;
unsafe {
    asm!("mov {}, 5", out(reg) x);
}
assert_eq!(x, 5);
# }
```

이 코드는 `5` 값을 `u64` 변수 `x` 에 씁니다.
사용하는 문자열 리터럴은 실제로 템플릿 문자열입니다.
이는 Rust [format 문자열][format-syntax] 의 규칙과 동일합니다.
그러나 삽입되는 변수는 익숙하지 않을 수 있습니다. 먼저 변수가 인라인 어셈블리의 입력 또는 출력인지 명시해야 합니다. 이 경우 출력입니다. `out` 를 쓰면서 선언했습니다.
또한 어셈블리가 변수를 어떤 종류의 레지스터에 기대하는지 명시해야 합니다. 이 경우 임의의 일반 목적 레지스터에 넣으므로 `reg` 를 지정했습니다.
컴파일러는 적절한 레지스터를 템플릿에 삽입하고, 인라인 어셈블리 실행 후에 이 레지스터에서 변수를 읽습니다.

[format-syntax]: https://doc.rust-lang.org/std/fmt/#syntax

입력을 사용하는 또 다른 예제를 살펴보겠습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let i: u64 = 3;
let o: u64;
unsafe {
    asm!(
        "mov {0}, {1}",
        "add {0}, 5",
        out(reg) o,
        in(reg) i,
    );
}
assert_eq!(o, 8);
# }
```

이 코드는 `i` 변수에 있는 값에 `5` 를 더하고 결과를 `o` 변수에 씁니다.
이 어셈블리가 이 작업을 수행하는 특정 방법은 `i` 에서 값을 `o` 로 복사한 다음 `5` 를 더하는 것입니다.

이 예제는 다음과 같은 점을 보여줍니다.

첫째, `asm!` 는 여러 템플릿 문자열 인수를 허용합니다. 각 인수는 새 줄의 어셈블리 코드로 취급되며, 줄 바꿈을 사용하여 어셈블리 코드를 쉽게 형식화할 수 있습니다.

둘째, 입력은 `out` 대신 `in` 을 사용하여 선언합니다.

셋째, 우리는 이름을 사용하여 인수 번호를 지정할 수 있습니다. 인라인 어셈블리 템플릿에서는 인수가 자주 사용되므로 이 기능이 특히 유용합니다. 더 복잡한 인라인 어셈블리를 사용할 때 이 기능을 사용하는 것이 일반적으로 좋습니다. 왜냐하면 읽기 쉽고, 지시어 순서를 바꿀 때 인수 순서를 변경하지 않기 때문입니다.

위 예제를 `mov` 지시어 없이 더욱 개선할 수 있습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut x: u64 = 3;
unsafe {
    asm!("add {0}, 5", inout(reg) x);
}
assert_eq!(x, 8);
# }
```

입력과 출력이 모두인 `inout`를 사용하는 것을 볼 수 있습니다.
이는 입력과 출력을 별도로 지정하는 것과 다르게, 동일한 레지스터에 할당된다는 것을 보장합니다.

`inout` 피연산자의 입력과 출력 부분에 다른 변수를 지정하는 것도 가능합니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let x: u64 = 3;
let y: u64;
unsafe {
    asm!("add {0}, 5", inout(reg) x => y);
}
assert_eq!(y, 8);
# }
```

## 늦은 출력 피연산자

Rust 컴파일러는 피연산자 할당에 보수적입니다. `out`은 언제든지 쓰일 수 있다고 가정되므로 다른 인수와 위치를 공유할 수 없습니다.
그러나 최적의 성능을 보장하기 위해 가능한 한 적은 레지스터를 사용하는 것이 중요합니다. 따라서 Rust는 `lateout` 지정자를 제공합니다. 이를 사용하여 모든 입력이 소비된 후에만 쓰이는 모든 출력에 사용할 수 있습니다. `inlateout` 변형도 있습니다.

다음은 `inlateout`가 `release` 모드 또는 다른 최적화된 경우에 사용할 수 없는 예입니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut a: u64 = 4;
let b: u64 = 4;
let c: u64 = 4;
unsafe {
    asm!(
        "add {0}, {1}",
        "add {0}, {2}",
        inout(reg) a,
        in(reg) b,
        in(reg) c,
    );
}
assert_eq!(a, 12);
# }
```

최적화되지 않은 경우 (예: `Debug` 모드) `inout(reg) a`를 위 예제에서 `inlateout(reg) a`로 바꾸면 예상된 결과를 얻을 수 있습니다. 그러나 `release` 모드 또는 다른 최적화된 경우 `inlateout(reg) a`를 사용하면 최종 값 `a = 16`이 되어 assert가 실패할 수 있습니다.

이는 최적화된 경우 컴파일러가 `b`와 `c`에 동일한 값이므로 동일한 레지스터를 할당할 수 있다는 것을 알기 때문입니다. 또한 `inlateout`가 사용될 때 `a`와 `c`가 동일한 레지스터에 할당될 수 있으며, 이 경우 첫 번째 `add` 명령어가 변수 `c`에서의 초기 로드를 덮어쓰게 됩니다. 반면 `inout(reg) a`를 사용하면 별도의 레지스터가 `a`에 할당된다는 것을 보장합니다.

다음 예제는 모든 입력 레지스터가 읽힌 후에 출력이만 수정되기 때문에 `inlateout`를 사용할 수 있습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut a: u64 = 4;
let b: u64 = 4;
unsafe {
    asm!("add {0}, {1}", inlateout(reg) a, in(reg) b);
}
assert_eq!(a, 8);
# }
```

이제 `a`와 `b`가 동일한 레지스터에 할당되어도 이 어셈블리 조각이 여전히 올바르게 작동한다는 것을 알 수 있습니다.

## 명시적 레지스터 피연산자

일부 명령어는 피연산자가 특정 레지스터에 있어야 합니다.
따라서 Rust 내부 어셈블리는 더 구체적인 제약 지정자를 제공합니다.
`reg`은 일반적으로 모든 아키텍처에서 사용 가능하지만 명시적 레지스터는 아키텍처에 매우 특정합니다. 예를 들어 x86의 경우 일반 목적 레지스터 `eax`, `ebx`, `ecx`, `edx`, `ebp`, `esi`, `edi` 등이 이름으로 참조될 수 있습니다.

```rust,no_run
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let cmd = 0xd1;
unsafe {
    asm!("out 0x64, eax", in("eax") cmd);
}
# }
```

이 예제에서는 `cmd` 변수의 내용을 포트 `0x64`로 출력하는 `out` 명령어를 호출합니다. `out` 명령어는 `eax` (및 하위 레지스터)만 입력으로 받기 때문에 `eax` 제약 지정자를 사용해야 합니다.

**참고**: 다른 연산자 유형과 달리 명시적인 레지스터 연산자는 템플릿 문자열에서 사용할 수 없습니다. `{}`를 사용할 수 없으며, 대신 레지스터 이름을 직접 작성해야 합니다. 또한, 모든 다른 연산자 유형 뒤에 나타나야 합니다.

다음은 x86 `mul` 명령어를 사용하는 예입니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

fn mul(a: u64, b: u64) -> u128 {
    let lo: u64;
    let hi: u64;

    unsafe {
        asm!(
            // x86 mul 명령어는 rax를 암시적 입력으로 사용하고 곱셈의 128비트 결과를 rax:rdx에 씁니다.
            "mul {}",
            in(reg) a,
            inlateout("rax") b => lo,
            lateout("rdx") hi
        );
    }

    ((hi as u128) << 64) + lo as u128
}
# }
```

이 예제는 두 개의 64비트 입력을 128비트 결과로 곱하는 `mul` 명령어를 사용합니다.
유일한 명시적 연산자는 `a` 변수에서 채워지는 레지스터입니다.
두 번째 연산자는 암시적이며, `rax` 레지스터여야 하며, 이는 `b` 변수에서 채워집니다.
결과의 하위 64비트는 `rax`에 저장되며, 이를 통해 `lo` 변수를 채웁니다.
상위 64비트는 `rdx`에 저장되며, 이를 통해 `hi` 변수를 채웁니다.

## clobbered 레지스터

대부분의 인라인 어셈블리 코드는 필요하지 않은 상태를 변경합니다.
이는 일반적으로 스크래치 레지스터를 어셈블리에서 사용해야 하거나, 우리가 더 이상 살펴볼 필요가 없는 상태를 변경하는 명령어를 사용하기 때문입니다.
이러한 상태는 일반적으로 "clobbered"라고 불립니다.
컴파일러에 이를 알려야 합니다. 왜냐하면 컴파일러가 인라인 어셈블리 블록 주변에서 이러한 상태를 저장하고 복원해야 할 수 있기 때문입니다.

```rust
use std::arch::asm;

# #[cfg(target_arch = "x86_64")]
fn main() {
    // 각각 4바이트의 세 개의 항목
    let mut name_buf = [0_u8; 12];
    // String은 ebx, edx, ecx 순서로 ascii로 저장됩니다.
    // ebx가 예약되어 있기 때문에 asm은 ebx의 값을 유지해야 합니다.
    // 따라서 asm 주변에서 ebx를 푸시하고 팝합니다.
    // 64비트 모드에서 64비트 프로세서에서는 32비트 레지스터(ebx와 같이)를 푸시하고 팝할 수 없습니다.
    // 따라서 확장된 rbx 레지스터를 사용해야 합니다.

    unsafe {
        asm!(
            "push rbx",
            "cpuid",
            "mov [rdi], ebx",
            "mov [rdi + 4], edx",
            "mov [rdi + 8], ecx",
            "pop rbx",
            // 값을 저장하기 위해 배열 포인터를 사용하는 것은 Rust 코드를 간소화하는 데 도움이 됩니다.
            // 어셈블리 코드의 작동 방식에 대한 명확한 설명을 제공합니다.
            // explicit register outputs such as `out("ecx") val`와 달리
            // 포인터 자체가 입력일 뿐입니다.
            in("rdi") name_buf.as_mut_ptr(),
            // cpuid 0을 선택하고 eax를 clobbered로 지정합니다.
            inout("eax") 0 => _,
            // cpuid는 이러한 레지스터도 clobber합니다.
            out("ecx") _,
            out("edx") _,
        );
    }

    let name = core::str::from_utf8(&name_buf).unwrap();
    println!("CPU 제조업체 ID: {}", name);
}

# #[cfg(not(target_arch = "x86_64"))]
# fn main() {}
```

위 예제에서는 `cpuid` 명령어를 사용하여 CPU 제조업체 ID를 읽습니다.
이 명령어는 `eax`에 최대 지원되는 `cpuid` 인수를 씁니다. `ebx`, `edx`, `ecx`는 순서대로 CPU 제조업체 ID를 ASCII 바이트로 씁니다.

 `eax` 가 읽히지 않더라도 컴파일러가 이전에 레지스터에 있던 값을 저장할 수 있도록 레지스터가 수정되었음을 알려야 합니다. 이는 `_` 대신 변수 이름을 사용하여 출력으로 선언함으로써 이루어집니다. 이는 출력 값이 버려질 것이라는 것을 나타냅니다.

이 코드는 LLVM에서 `ebx`가 예약된 레지스터라는 제한을 우회하는 방법도 제공합니다. 즉, LLVM은 `ebx`에 대한 완전한 제어를 가정하며, asm 블록을 종료하기 전에 원래 상태로 복원되어야 하므로, 일반 레지스터 클래스를 사용하여 `in(reg)`와 같이 컴파일러가 사용하는 경우를 제외하고 입력 또는 출력으로 사용할 수 없습니다. 이로 인해 `reg` 피연산자가 위험해지며, 동일한 레지스터를 공유하기 때문에 의도치 않게 입력 또는 출력을 손상시킬 수 있습니다.

이를 우회하기 위해 `rdi`를 출력 배열의 포인터로 저장하고, `push`를 통해 `ebx`를 저장하고, asm 블록 내에서 `ebx`를 배열로 읽고 `pop`을 통해 `ebx`를 원래 상태로 복원합니다. `push`와 `pop`는 전체 64비트 `rbx` 버전의 레지스터를 사용하여 전체 레지스터가 저장되도록 합니다. 32비트 대상에서는 코드가 `push`/`pop`에서 `ebx`를 사용할 것입니다.

이 방법은 asm 코드 내에서 사용할 스크래치 레지스터를 얻기 위해 일반 레지스터 클래스와 함께 사용할 수도 있습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

// 6을 사용하여 x를 곱하기
let mut x: u64 = 4;
unsafe {
    asm!(
        "mov {tmp}, {x}",
        "shl {tmp}, 1",
        "shl {x}, 2",
        "add {x}, {tmp}",
        x = inout(reg) x,
        tmp = out(reg) _,
    );
}
assert_eq!(x, 4 * 6);
# }
```

## 상징 피연산자 및 ABI clobbers

`asm!`는 기본적으로 지정되지 않은 레지스터는 어셈블리 코드에서 내용이 보존된다고 가정합니다. `asm!`의 [`clobber_abi`] 인수는 컴파일러가 주어진 호출 규약 ABI에 따라 필요한 clobber 피연산자를 자동으로 삽입하도록 합니다. 해당 ABI에서 완전히 보존되지 않는 모든 레지스터는 clobber된 것으로 간주됩니다. 여러 `clobber_abi` 인수를 제공할 수 있으며, 모든 지정된 ABI에서 clobber된 모든 피연산자가 삽입됩니다.

[`clobber_abi`]: https://doc.rust-lang.org/stable/reference/inline-assembly.html#abi-clobbers

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

extern "C" fn foo(arg: i32) -> i32 {
    println!("arg = {}", arg);
    arg * 2
}

fn call_foo(arg: i32) -> i32 {
    unsafe {
        let result;
        asm!(
            "call {}",
            // 호출할 함수 포인터
            in(reg) foo,
            // 1번째 인수는 rdi에 있음
            in("rdi") arg,
            // rax에 반환 값
            out("rax") result,
            // "C" 호출 규약에서 보존되지 않는 모든 레지스터를 clobber로 표시합니다.
            clobber_abi("C"),
        );
        result
    }
}
# }
```

## 레지스터 템플릿 수정자

어떤 경우에는 레지스터 이름이 어셈블리 코드 문자열에 삽입될 때 정밀한 제어가 필요합니다. 이는 특정 아키텍처의 어셈블리 언어가 동일한 레지스터에 대해 여러 이름을 가지고 있을 때 필요하며, 각 이름은 일반적으로 레지스터의 서브셋에 대한 "뷰"입니다 (예: 64비트 레지스터의 하위 32비트).

기본적으로 컴파일러는 항상 전체 레지스터 크기를 나타내는 이름을 선택합니다 (예: x86-64에서 `rax`, x86에서 `eax` 등).

이 기본값을 `reg_abcd`와 같은 레지스터 이름을 사용하여 템플릿 문자열 피연산자에 대한 수정자를 사용하여 재정의할 수 있습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut x: u16 = 0xab;

unsafe {
    asm!("mov {0:h}, {0:l}", inout(reg_abcd) x);
}

assert_eq!(x, 0xabab);
# }
```

In this example, we use the `reg_abcd` register class to restrict the register allocator to the 4 legacy x86 registers (`ax`, `bx`, `cx`, `dx`) of which the first two bytes can be addressed independently.

Let us assume that the register allocator has chosen to allocate `x` in the `ax` register.
The `h` modifier will emit the register name for the high byte of that register and the `l` modifier will emit the register name for the low byte. The asm code will therefore be expanded as `mov ah, al` which copies the low byte of the value into the high byte.

If you use a smaller data type (e.g. `u16`) with an operand and forget to use template modifiers, the compiler will emit a warning and suggest the correct modifier to use.

## Memory address operands

Sometimes assembly instructions require operands passed via memory addresses/memory locations.
You have to manually use the memory address syntax specified by the target architecture.
For example, on x86/x86_64 using Intel assembly syntax, you should wrap inputs/outputs in `[]` to indicate they are memory operands:

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

fn load_fpu_control_word(control: u16) {
    unsafe {
        asm!("fldcw [{}]", in(reg) &control, options(nostack));
    }
}
# }
```

## Labels

Any reuse of a named label, local or otherwise, can result in an assembler or linker error or may cause other strange behavior. Reuse of a named label can happen in a variety of ways including:

-   explicitly: using a label more than once in one `asm!` block, or multiple times across blocks.
-   implicitly via inlining: the compiler is allowed to instantiate multiple copies of an `asm!` block, for example when the function containing it is inlined in multiple places.
-   implicitly via LTO: LTO can cause code from *other crates* to be placed in the same codegen unit, and so could bring in arbitrary labels.

As a consequence, you should only use GNU assembler **numeric** [local labels] inside inline assembly code. Defining symbols in assembly code may lead to assembler and/or linker errors due to duplicate symbol definitions.

Moreover, on x86 when using the default Intel syntax, due to [an LLVM bug], you shouldn't use labels exclusively made of `0` and `1` digits, e.g. `0`, `11` or `101010`, as they may end up being interpreted as binary values. Using `options(att_syntax)` will avoid any ambiguity, but that affects the syntax of the _entire_ `asm!` block. (See [Options](#options), below, for more on `options`.)

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut a = 0;
unsafe {
    asm!(
        "mov {0}, 10",
        "2:",
        "sub {0}, 1",
        "cmp {0}, 3",
        "jle 2f",
        "jmp 2b",
        "2:",
        "add {0}, 2",
        out(reg) a
    );
}
assert_eq!(a, 5);
# }
```

This will decrement the `{0}` register value from 10 to 3, then add 2 and store it in `a`.

This example shows a few things:

- First, that the same number can be used as a label multiple times in the same inline block.
- Second, that when a numeric label is used as a reference (as an instruction operand, for example), the suffixes “b” (“backward”) or ”f” (“forward”) should be added to the numeric label. It will then refer to the nearest label defined by this number in this direction.

[local labels]: https://sourceware.org/binutils/docs/as/Symbol-Names.html#Local-Labels
[an LLVM bug]: https://bugs.llvm.org/show_bug.cgi?id=36144

## Options {#options}

기본적으로, 인라인 어셈블리 블록은 사용자 정의 호출 규칙을 가진 외부 FFI 함수 호출과 동일하게 처리됩니다. 즉, 메모리에 읽고/쓰거나, 관찰 가능한 부작용을 가질 수 있습니다. 그러나 많은 경우에, 컴파일러가 어셈블리 코드가 실제로 무엇을 하는지에 대한 더 많은 정보를 제공하여 더 나은 최적화를 수행할 수 있습니다.

이전에 `add` 명령어의 예를 살펴보겠습니다.

```rust
# #[cfg(target_arch = "x86_64")] {
use std::arch::asm;

let mut a: u64 = 4;
let b: u64 = 4;
unsafe {
    asm!(
        "add {0}, {1}",
        inlateout(reg) a, in(reg) b,
        options(pure, nomem, nostack),
    );
}
assert_eq!(a, 8);
# }
```

옵션은 `asm!` 매크로의 선택적 마지막 인수로 제공될 수 있습니다. 여기에서는 세 가지 옵션을 지정했습니다.
- `pure`는 어셈블리 코드가 관찰 가능한 부작용이 없으며 출력이 입력에만 의존한다는 것을 의미합니다. 이를 통해 컴파일러 최적화기가 인라인 어셈블리를 적게 호출하거나 완전히 제거할 수 있습니다.
- `nomem`은 어셈블리 코드가 메모리에 읽거나 쓰지 않는다는 것을 의미합니다. 기본적으로 컴파일러는 인라인 어셈블리가 사용자에게 제공된 포인터를 통해 접근 가능한 모든 메모리 주소를 읽거나 쓸 수 있다고 가정합니다.
- `nostack`는 어셈블리 코드가 스택에 데이터를 푸시하지 않는다는 것을 의미합니다. 이를 통해 컴파일러는 x86-64에서 스택 빨간색 영역과 같은 최적화를 사용하여 스택 포인터 조정을 피할 수 있습니다.

이러한 옵션은 `asm!`를 사용하여 코드를 더 잘 최적화할 수 있도록 컴파일러에 도움을 줍니다. 예를 들어, 필요하지 않은 출력을 가진 순수한 `asm!` 블록을 제거할 수 있습니다.

[참조](https://doc.rust-lang.org/stable/reference/inline-assembly.html)를 참조하여 사용 가능한 옵션과 그 효과에 대한 자세한 내용을 확인하십시오.
