## 오류 래핑

오류를 박스에 담는 대안으로는 자신의 오류 유형에 오류를 감싸는 것입니다.

```rust,editable
use std::error;
use std::error::Error;
use std::num::ParseIntError;
use std::fmt;

type Result<T> = std::result::Result<T, DoubleError>;

#[derive(Debug)]
enum DoubleError {
    EmptyVec,
    // Parse 오류 구현에 따라 추가 정보를 제공합니다.
    // 추가 정보를 제공하려면 유형에 더 많은 데이터를 추가해야 합니다.
    Parse(ParseIntError),
}

impl fmt::Display for DoubleError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            DoubleError::EmptyVec =>
                write!(f, "최소 하나의 요소를 가진 벡터를 사용하세요"),
            // 감싸진 오류에는 추가 정보가 포함되어 있으며,
            // `source()` 메서드를 통해 사용할 수 있습니다.
            DoubleError::Parse(..) =>
                write!(f, "숫자로 변환할 수 없는 문자열입니다"),
        }
    }
}

impl error::Error for DoubleError {
    fn source(&self) -> Option<&(dyn error::Error + 'static)> {
        match *self {
            DoubleError::EmptyVec => None,
            // 원인은 기본적인 구현 오류 유형입니다. 암시적으로
            // `&error::Error` 트레이트 객체로 변환됩니다. 이것은
            // 기본 유형이 이미 `Error` 트레이트를 구현하기 때문입니다.
            DoubleError::Parse(ref e) => Some(e),
        }
    }
}

// `ParseIntError`에서 `DoubleError`로 변환을 구현합니다.
// 이것은 `?`를 사용하여 `ParseIntError`가
// `DoubleError`로 변환되어야 할 때 자동으로 호출됩니다.
impl From<ParseIntError> for DoubleError {
    fn from(err: ParseIntError) -> DoubleError {
        DoubleError::Parse(err)
    }
}

fn double_first(vec: Vec<&str>) -> Result<i32> {
    let first = vec.first().ok_or(DoubleError::EmptyVec)?;
    // 여기서는 `ParseIntError`의 `From` 구현을 암시적으로 사용합니다.
    // (위에서 정의했습니다) `DoubleError`를 생성하기 위해.
    let parsed = first.parse::<i32>()?;

    Ok(2 * parsed)
}

fn print(result: Result<i32>) {
    match result {
        Ok(n)  => println!("첫 번째 숫자는 {} 입니다", n),
        Err(e) => {
            println!("오류: {}", e);
            if let Some(source) = e.source() {
                println!("  원인: {}", source);
            }
        },
    }
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    print(double_first(numbers));
    print(double_first(empty));
    print(double_first(strings));
}
```

이것은 오류를 처리하는 데 약간 더 많은 boilerplate 코드를 추가하며 모든 애플리케이션에 필요하지는 않습니다. 오류 처리를 위한 boilerplate 코드를 처리하는 데 도움이 되는 라이브러리가 있습니다.

### 참조

[`From::from`][from] 및 [`Enums`][enums]


[`오류 처리 라이브러리`][crates-errors]

[from]: https://doc.rust-lang.org/std/convert/trait.From.html
[enums]: ../../custom_types/enum.md
[crates-errors]: https://crates.io/keywords/error-handling
