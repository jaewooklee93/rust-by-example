## `Box` 에러 래핑

원래 오류를 유지하면서 간단한 코드를 작성하는 방법은 오류를 [`Box`][box] 에 래핑하는 것입니다.
단점은 기본 오류 유형이 런타임에만 알려지며
[static dispatch][dynamic_dispatch]가 아닌 것입니다.

`stdlib`는 `Box`가 `Error` 트레이트를 구현하는 모든 유형에서 `Box<Error>` 트레이트 객체로 변환하는 데 도움을 줍니다.
[`From`][from]를 통해.

```rust,editable
use std::error;
use std::fmt;

// `Box<dyn error::Error>`를 사용하여 별칭 변경
type Result<T> = std::result::Result<T, Box<dyn error::Error>>;

#[derive(Debug, Clone)]
struct EmptyVec;

impl fmt::Display for EmptyVec {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}

impl error::Error for EmptyVec {}

fn double_first(vec: Vec<&str>) -> Result<i32> {
    vec.first()
        .ok_or_else(|| EmptyVec.into()) // Box로 변환
        .and_then(|s| {
            s.parse::<i32>()
                .map_err(|e| e.into()) // Box로 변환
                .map(|i| 2 * i)
        })
}

fn print(result: Result<i32>) {
    match result {
        Ok(n) => println!("The first doubled is {}", n),
        Err(e) => println!("Error: {}", e),
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

### 참조

[Dynamic dispatch][dynamic_dispatch] 및 [`Error` 트레이트][error]

[box]: https://doc.rust-lang.org/std/boxed/struct.Box.html
[dynamic_dispatch]: https://doc.rust-lang.org/book/ch17-02-trait-objects.html#trait-objects-perform-dynamic-dispatch
[error]: https://doc.rust-lang.org/std/error/trait.Error.html
[from]: https://doc.rust-lang.org/std/convert/trait.From.html
