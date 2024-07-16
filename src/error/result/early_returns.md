## 조기 반환

이전 예제에서는 조합자를 사용하여 오류를 명시적으로 처리했습니다.
오류 분석을 다루는 또 다른 방법은 `match` 문과 *조기 반환*을 조합하는 것입니다.

즉, 오류가 발생하면 함수 실행을 중단하고 오류를 반환할 수 있습니다. 어떤 사람들에게는 이러한 형태의 코드가 읽고 작성하기 쉬울 수 있습니다. 이전 예제의 이러한 버전을 조기 반환을 사용하여 작성한 예를 살펴보겠습니다.

```rust,editable
use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = match first_number_str.parse::<i32>() {
        Ok(first_number)  => first_number,
        Err(e) => return Err(e),
    };

    let second_number = match second_number_str.parse::<i32>() {
        Ok(second_number)  => second_number,
        Err(e) => return Err(e),
    };

    Ok(first_number * second_number)
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    print(multiply("10", "2"));
    print(multiply("t", "2"));
}
```

이제 명시적으로 조합자와 조기 반환을 사용하여 오류를 처리하는 방법을 배웠습니다. 일반적으로는 `panic`을 피하고 싶지만, 모든 오류를 명시적으로 처리하는 것은 번거롭습니다.

다음 섹션에서는 `?`를 소개하여 `unwrap`할 때 `panic`을 유발하지 않고도 사용할 수 있습니다.
