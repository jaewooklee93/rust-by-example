## `?`의 다른 사용법

이전 예제에서 `parse`를 호출할 때 우리의 즉각적인 반응은 라이브러리 오류에서 오류를 `map`하는 것입니다.

```rust,ignore
.and_then(|s| s.parse::<i32>())
    .map_err(|e| e.into())
```

이것은 간단하고 흔한 작업이기 때문에 생략될 수 있을 것입니다. 하지만 `and_then`이 충분히 유연하지 않기 때문에 불가능합니다. 그러나 대신 `?`를 사용할 수 있습니다.

`?`는 이전에 `unwrap` 또는 `return Err(err)`로 설명되었습니다. 이것은 거의 사실입니다. 실제로는 `unwrap` 또는 `return Err(From::from(err))`를 의미합니다. `From::from`가 다른 유형 간의 변환 유틸리티이기 때문에, `?`에서 오류가 반환 유형으로 변환 가능하면 자동으로 변환됩니다.

여기서 `?`를 사용하여 이전 예제를 다시 작성합니다. 결과적으로 `From::from`가 우리의 오류 유형에 대해 구현되면 `map_err`가 사라집니다.

```rust,editable
use std::error;
use std::fmt;

// alias를 `Box<dyn error::Error>`를 사용하도록 변경합니다.
type Result<T> = std::result::Result<T, Box<dyn error::Error>>;

#[derive(Debug)]
struct EmptyVec;

impl fmt::Display for EmptyVec {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}

impl error::Error for EmptyVec {}

// 이전과 같은 구조이지만 `Results`와 `Options`을 모두 연결하는 대신 `?`를 사용하여 즉시 내부 값을 가져옵니다.
fn double_first(vec: Vec<&str>) -> Result<i32> {
    let first = vec.first().ok_or(EmptyVec)?;
    let parsed = first.parse::<i32>()?;
    Ok(2 * parsed)
}

fn print(result: Result<i32>) {
    match result {
        Ok(n)  => println!("The first doubled is {}", n),
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

이것은 지금은 매우 깔끔합니다. 원래 `panic`와 비교했을 때, `unwrap` 호출을 `?`로 대체하는 것과 유사하지만 반환 유형이 `Result`이기 때문에 최상위에서 해체되어야 합니다.

### 참조

[`From::from`][from] and [`?`][q_mark]

[from]: https://doc.rust-lang.org/std/convert/trait.From.html
[q_mark]: https://doc.rust-lang.org/reference/expressions/operator-expr.html#the-question-mark-operator
