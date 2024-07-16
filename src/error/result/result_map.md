## `Result`의 `map` 함수

이전 예제의 `multiply` 함수에서 panic()를 사용하는 것은 견고한 코드를 만드는 데 도움이 되지 않습니다.
일반적으로, 오류를 호출자에게 반환하여 오류에 대한 적절한 응답 방식을 결정하도록 해야 합니다.

우선, 어떤 종류의 오류 유형을 다루고 있는지 알아야 합니다. `Err` 유형을 파악하려면 [`parse()`][parse] 함수를 살펴보세요. 이 함수는 [`i32`][i32]에 대한 [`FromStr`][from_str] 트레이트를 구현하기 때문에 `Err` 유형은 [`ParseIntError`][parse_int_error]로 지정됩니다.

다음 예제에서는 직관적인 `match` 문으로 코드가 더 복잡해 보입니다.

```rust,editable
use std::num::ParseIntError;

// 반환 유형이 수정되면 `unwrap()` 없이 패턴 매칭을 사용할 수 있습니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    match first_number_str.parse::<i32>() {
        Ok(first_number)  => {
            match second_number_str.parse::<i32>() {
                Ok(second_number)  => {
                    Ok(first_number * second_number)
                },
                Err(e) => Err(e),
            }
        },
        Err(e) => Err(e),
    }
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    // 여전히 합리적인 답변을 제공합니다.
    let twenty = multiply("10", "2");
    print(twenty);

    // 다음은 훨씬 더 유용한 오류 메시지를 제공합니다.
    let tt = multiply("t", "2");
    print(tt);
}
```

다행히 `Option`의 `map`, `and_then`과 같은 많은 다른 조합자도 `Result`에 대해 구현되어 있습니다. [`Result`][result]에는 전체 목록이 있습니다.

```rust,editable
use std::num::ParseIntError;

// `Option`과 마찬가지로 `map()`과 같은 조합자를 사용할 수 있습니다.
// 이 함수는 위와 동일하며 다음과 같이 읽을 수 있습니다.
// 두 값이 문자열에서 파싱될 수 있다면 곱하기, 그렇지 않으면 오류를 전달합니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    first_number_str.parse::<i32>().and_then(|first_number| {
        second_number_str.parse::<i32>().map(|second_number| first_number * second_number)
    })
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    // 여전히 합리적인 답변을 제공합니다.
    let twenty = multiply("10", "2");
    print(twenty);

    // 다음은 훨씬 더 유용한 오류 메시지를 제공합니다.
    let tt = multiply("t", "2");
    print(tt);
}
```

[parse]: https://doc.rust-lang.org/std/primitive.str.html#method.parse
[from_str]: https://doc.rust-lang.org/std/str/trait.FromStr.html
[i32]: https://doc.rust-lang.org/std/primitive.i32.html
[parse_int_error]: https://doc.rust-lang.org/std/num/struct.ParseIntError.html
[result]: https://doc.rust-lang.org/std/result/enum.Result.html
