## 정적

Rust에는 몇 가지 예약된 라이프타임 이름이 있습니다. 그 중 하나는 `'static`입니다. 이를 두 가지 상황에서 마주칠 수 있습니다.

```rust, editable
// 'static 라이프타임을 가진 참조:
let s: &'static str = "hello world";

// trait bound의 일부로서 'static:
fn generic<T>(x: T) where T: 'static {}
```

두 가지 모두 관련이 있지만 미세하게 다르며, Rust를 배우는 동안 흔한 혼란의 원천입니다. 각 상황에 대한 몇 가지 예를 살펴보겠습니다.

## 참조 라이프타임

`'static` 참조 라이프타임으로서, 해당 참조가 가리키는 데이터가 프로그램 실행이 끝날 때까지 유효합니다. 여전히 더 짧은 라이프타임으로 강제 변환될 수 있습니다.

`'static` 라이프타임을 가진 변수를 만드는 두 가지 일반적인 방법은 모두 바이너리의 읽기 전용 메모리에 저장됩니다.

* `static` 선언을 사용하여 상수를 만듭니다.
* `string` 리터럴을 만듭니다. 그 유형은 `&'static str`입니다.

각 방법을 보여주는 예제를 아래에 보여줍니다.

```rust, editable
// `static` 선언을 사용하여 상수를 만듭니다.
static NUM: i32 = 18;

// `'static` 라이프타임을 가진 `NUM`를 입력 인수의 라이프타임으로 강제 변환합니다.
fn coerce_static<'a>(_: &'a i32) -> &'a i32 {
    &NUM
}

fn main() {
    {
        // `string` 리터럴을 만듭니다. 그리고 출력합니다.
        let static_string = "I'm in read-only memory";
        println!("static_string: {}", static_string);

        // `static_string`가 범위를 벗어날 때 참조를 더 이상 사용할 수 없지만 데이터는 바이너리에 남습니다.
    }

    {
        // `coerce_static`을 사용하기 위한 정수를 만듭니다.
        let lifetime_num = 9;

        // `lifetime_num`의 라이프타임으로 `NUM`을 강제 변환합니다.
        let coerced_static = coerce_static(&lifetime_num);

        println!("coerced_static: {}", coerced_static);
    }

    println!("NUM: {} stays accessible!", NUM);
}
```

`'static` 참조는 프로그램의 _나머지_ 기간 동안 유효해야 하므로, 프로그램 실행 중에 생성할 수 있습니다. 단지 시연하기 위해 아래 예제는 [`Box::leak`](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.leak)을 사용하여 동적으로 `'static` 참조를 생성합니다. 그 경우 프로그램 전체 기간 동안 유효하지 않지만, 누출 지점 이후로는 유효합니다.

```rust, editable, compile_fail
extern crate rand;
use rand::Fill;

fn random_vec() -> &'static [usize; 100] {
    let mut rng = rand::thread_rng();
    let mut boxed = Box::new([0; 100]);
    boxed.try_fill(&mut rng).unwrap();
    Box::leak(boxed)
}

fn main() {
    let first: &'static [usize; 100] = random_vec();
    let second: &'static [usize; 100] = random_vec();
    assert_ne!(first, second)
}
```

## Trait bound

Trait bound로서, 유형에는 정적 참조가 포함되어 있지 않습니다. 예를 들어, 수신자는 유형을 원하는 만큼 오래 유지할 수 있으며, 그들이 해제할 때까지 유효하지 않아집니다.

이것은 소유된 데이터는 항상 `'static` 라이프타임 bound를 통과한다는 것을 의미하지만, 소유된 데이터에 대한 참조는 일반적으로 `'static`가 아님을 의미합니다.

```rust, editable, compile_fail
use std::fmt::Debug;

fn print_it( input: impl Debug + 'static ) {
    println!( "'static value passed in is: {:?}", input );
}

fn main() {
    // i는 소유되고 참조를 포함하지 않으므로 'static입니다:
    let i = 5;
    print_it(i);

    // oops, &i는 main()의 범위에서만 정의된 라이프타임을 가지므로 'static가 아닙니다:
    print_it(&i);
}
```

컴파일러는 다음과 같은 오류 메시지를 표시합니다.
```ignore
error[E0597]: `i` does not live long enough
  --> src/lib.rs:15:15
   |
```15 |     print_it(&i);
   |     ---------^^--
   |     |         |
   |     |         'i'가 충분히 오래 살지 않아서 대여된 값이 아직 유효하지 않음
   |     인수는 `i`가 `'static` 동안 대여되어야 함
16 | }
   | - `i`가 여전히 대여 중인 상태에서 여기서 삭제됨
```

### 참조:

[`'static` 상수][static_const]

[static_const]: ../../custom_types/constants.md
