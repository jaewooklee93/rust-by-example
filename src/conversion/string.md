## 문자열 변환

### 문자열로 변환하기

어떤 유형을 `String`으로 변환하는 것은 해당 유형에 대한 [`ToString`]
trait를 구현하는 것만큼 간단합니다. 직접 구현하는 대신, [`fmt::Display`][Display] 트레이트를 구현하는 것이 좋습니다. 이 트레이트는 자동으로 [`ToString`]를 제공하며, [`print!`][print] 섹션에서 설명한 유형을 출력하는 데에도 사용됩니다.

```rust,editable
use std::fmt;

struct Circle {
    radius: i32
}

impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Circle of radius {}", self.radius)
    }
}

fn main() {
    let circle = Circle { radius: 6 };
    println!("{}", circle.to_string());
}
```

### 문자열 분석하기

문자열을 여러 유형으로 변환하는 것은 유용하지만, 문자열을 숫자로 변환하는 것은 흔한 작업 중 하나입니다. 이 작업을 수행하는 일반적인 방법은 [`parse`] 함수를 사용하는 것입니다. 유형 추론을 사용하거나 'turbofish' 구문을 사용하여 파싱할 유형을 명시할 수 있습니다. 두 가지 대안이 다음 예제에서 보여집니다.

이 코드는 지정된 유형으로 문자열을 변환합니다. [`FromStr`]
trait가 해당 유형에 대해 구현되어 있는 경우에만 가능합니다. 표준 라이브러리 내의 여러 유형에 대해 이 기능이 구현되어 있습니다. 사용자 정의 유형에 대해 이 기능을 사용하려면 해당 유형에 대한 [`FromStr`] 트레이트를 구현해야 합니다.

```rust,editable
fn main() {
    let parsed: i32 = "5".parse().unwrap();
    let turbo_parsed = "10".parse::<i32>().unwrap();

    let sum = parsed + turbo_parsed;
    println!("Sum: {:?}", sum);
}
```

[`ToString`]: https://doc.rust-lang.org/std/string/trait.ToString.html
[Display]: https://doc.rust-lang.org/std/fmt/trait.Display.html
[print]: ../hello/print.md
[`parse`]: https://doc.rust-lang.org/std/primitive.str.html#method.parse
[`FromStr`]: https://doc.rust-lang.org/std/str/trait.FromStr.html
