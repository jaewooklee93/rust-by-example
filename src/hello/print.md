## 형식화된 출력

출력은 `std::fmt` 라이브러리에 정의된 일련의 [메타프로세서](macros)를 통해 처리되며, 그 중 일부는 다음과 같습니다.

* `format!`: `String`에 형식화된 텍스트를 작성합니다.
* `print!`: `format!`와 동일하지만 텍스트가 콘솔(io::stdout)에 출력됩니다.
* `println!`: `print!`와 동일하지만 줄바꿈이 추가됩니다.
* `eprint!`: `print!`와 동일하지만 텍스트가 표준 오류(io::stderr)에 출력됩니다.
* `eprintln!`: `eprint!`와 동일하지만 줄바꿈이 추가됩니다.

모든 문자열은 동일한 방식으로 분석됩니다. 또한 Rust는 컴파일 시간에 형식 정확성을 검사합니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    // 일반적으로 `{}`는 자동으로 모든 인수로 대체됩니다. 이러한 인수는 문자열로 변환됩니다.
    println!("{}일", 31);

    // 위치 기반 인수를 사용할 수 있습니다. `{}` 안에 정수를 지정하면 추가 인수 중 어떤 것이 대체될지 결정됩니다. 인수는 형식 문자열 바로 뒤에 있는 0부터 시작합니다.
    println!("{0}, 이것은 {1}. {1}, 이것은 {0}", "Alice", "Bob");

    // 이름 지정된 인수를 사용할 수도 있습니다.
    println!("{subject} {verb} {object}",
             object="게으른 개",
             subject="빠른 갈색 여우",
             verb="뛰어넘습니다");

    // `:` 뒤에 지정하면 다른 형식을 사용할 수 있습니다.
    println!("10진수:               {}",   69420); // 69420
    println!("2진수:       {:b}", 69420); // 10000111100101100
    println!("8진수:        {:o}", 69420); // 207454
    println!("16진수: {:x}", 69420); // 10f2c

    // 텍스트를 지정된 너비로 오른쪽 정렬할 수 있습니다. 이것은 "    1"을 출력합니다. (4개의 흰색 공백과 "1"을 포함하여 총 5개의 너비).
    println!("{number:>5}", number=1);

    // 숫자를 0으로 채울 수 있습니다,
    println!("{number:0>5}", number=1); // 00001
    // 그리고 왼쪽 정렬하여 반대 방향으로 합니다. 이것은 "10000"을 출력합니다.
    println!("{number:0<5}", number=1); // 10000

    // `$`를 추가하여 형식 지정자에 이름 지정된 인수를 사용할 수 있습니다.
    println!("{number:0>width$}", number=1, width=5);

    // Rust는 사용된 인수의 수가 올바른지 확인합니다.
    println!("My name is {0}, {1} {0}", "Bond");
    // FIXME ^ 추가된 인수: "James"

    // `{}`를 사용하여 출력할 수 있는 유일한 유형은 `fmt::Display`를 구현한 유형입니다. 사용자 정의 유형은 기본적으로 `fmt::Display`를 구현하지 않습니다.

    #[allow(dead_code)] // `dead_code` 경고를 무시하여 사용되지 않는 모듈을 허용합니다.
    struct Structure(i32);

    // `fmt::Display`를 구현하지 않았기 때문에 이것은 컴파일되지 않습니다.
    // println!("This struct `{}` won't print...", Structure(3));
    // TODO ^ 이 줄을 주석 해제해 보세요

    // Rust 1.58 이상에서는 주변 변수에서 인수를 직접 가져올 수 있습니다. 위와 같이 "    1"을 출력합니다. 4개의 흰색 공백과 "1"입니다.
    let number: f64 = 1.0;
    let width: usize = 5;
    println!("{number:>width$}");
}
```

[`std::fmt`][fmt]에는 텍스트 출력을 관리하는 많은 [traits](traits)가 포함되어 있습니다. 아래는 두 가지 중요한 기본 형태입니다.

* `fmt::Debug`: `{:?}` 마커를 사용합니다. 디버깅 목적으로 텍스트를 형식화합니다.
* `fmt::Display`: `{}` 마커를 사용합니다. 디버깅 목적이 아닌 더 우아하고 사용자 친화적인 방식으로 텍스트를 형식화합니다.

여기서는 `fmt::Display`를 사용했는데, 왜냐하면 std 라이브러리는 이러한 유형에 대한 구현을 제공하기 때문입니다. 사용자 정의 유형을 출력하려면 추가적인 단계가 필요합니다.

 `fmt::Display` trait를 구현하면 자동으로 [`ToString`] trait가 구현되어 [`String`][string]으로 타입을 [변환]할 수 있습니다.

*라인 43*에서 `#[allow(dead_code)]`는 모듈 이후에만 적용되는 [속성]입니다.

### 활동

* 위 코드의 문제를 해결하세요 (FIXME 참조)  오류 없이 실행되도록 하세요.
* `Structure` 구조체를 형식화하려는 줄을 해제해보세요 (TODO 참조)
* `println!` 매크로 호출을 추가하여 `Pi는 약 3.142`를 출력하세요. 소수점 자리수를 제어하세요. 이 연습의 목적을 위해 `let pi = 3.141592`를 파이에 대한 추정치로 사용하세요. (힌트: [`std::fmt`][fmt] 문서를 확인하여 표시할 소수점 자리수를 설정하는 방법을 확인하세요)

### 참조

[`std::fmt`][fmt], [`macros`][macros], [`struct`][structs], [`traits`][traits], and [`dead_code`][dead_code]

[fmt]: https://doc.rust-lang.org/std/fmt/
[macros]: ../macros.md
[string]: ../std/str.md
[structs]: ../custom_types/structs.md
[traits]: https://doc.rust-lang.org/std/fmt/#formatting-traits
[`ToString`]: https://doc.rust-lang.org/std/string/trait.ToString.html
[convert]: ../conversion/string.md
[attribute]: ../attribute.md
[dead_code]: ../attribute/unused.md
