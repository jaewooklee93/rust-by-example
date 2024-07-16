## `Result`

[`Result`][result]는 [`Option`][option] 유형의 더 풍부한 버전으로, 가능한 *오류*를 나타내는 대신 가능한 *부재*를 나타냅니다.

즉, `Result<T, E>`는 다음 두 가지 결과 중 하나를 가질 수 있습니다.

* `Ok(T)`: 요소 `T`가 찾아졌습니다.
* `Err(E)`: 오류가 발생하여 요소 `E`가 있습니다.

관례에 따라 기대되는 결과는 `Ok`이고 예상치 못한 결과는 `Err`입니다.

`Option`과 마찬가지로 `Result`에도 많은 메서드가 있습니다. 예를 들어 `unwrap()`은 요소 `T`를 반환하거나 `panic`합니다. 경우 처리를 위해 `Result`와 `Option` 사이에는 많은 중복되는 조합자들이 있습니다.

Rust를 사용하면서 `Result` 유형을 반환하는 메서드를 많이 접하게 됩니다. 예를 들어 [`parse()`][parse] 메서드와 같습니다. 항상 문자열을 다른 유형으로 파싱할 수 있는 것은 아니므로 `parse()`는 파싱에 실패할 수 있는지 나타내는 `Result`를 반환합니다.

문자열을 성공적으로 및 실패적으로 `parse()`하는 경우를 살펴보겠습니다.

```rust,editable,ignore,mdbook-runnable
fn multiply(first_number_str: &str, second_number_str: &str) -> i32 {
    // `unwrap()`을 사용하여 숫자를 가져올까요? 우리를 물리치게 될까요?
    let first_number = first_number_str.parse::<i32>().unwrap();
    let second_number = second_number_str.parse::<i32>().unwrap();
    first_number * second_number
}

fn main() {
    let twenty = multiply("10", "2");
    println!("double is {}", twenty);

    let tt = multiply("t", "2");
    println!("double is {}", tt);
}
```

성공하지 못한 경우 `parse()`는 `unwrap()`에 오류를 남겨 `panic`하게 됩니다. 또한 `panic`은 프로그램을 종료하고 불쾌한 오류 메시지를 제공합니다.

오류 메시지의 품질을 향상시키기 위해서는 반환 유형에 대해 더 구체적이어야 하며 오류를 명시적으로 처리해야 합니다.

## `main`에서 `Result` 사용

`Result` 유형은 `main` 함수의 반환 유형이 될 수도 있습니다. `main` 함수는 일반적으로 다음과 같은 형태입니다.

```rust
fn main() {
    println!("Hello World!");
}
```

그러나 `main`은 `Result` 유형을 반환할 수도 있습니다. `main` 함수에서 오류가 발생하면 오류 코드를 반환하고 디버그 표현을 출력합니다 ( [`Debug`] trait를 사용하여). 다음 예제는 그러한 시나리오를 보여주며 [다음 섹션]에서 다루는 측면을 간략하게 다룹니다.

```rust,editable
use std::num::ParseIntError;

fn main() -> Result<(), ParseIntError> {
    let number_str = "10";
    let number = match number_str.parse::<i32>() {
        Ok(number)  => number,
        Err(e) => return Err(e),
    };
    println!("{}", number);
    Ok(())
}
```


[option]: https://doc.rust-lang.org/std/option/enum.Option.html
[result]: https://doc.rust-lang.org/std/result/enum.Result.html
[parse]: https://doc.rust-lang.org/std/primitive.str.html#method.parse
[`Debug`]: https://doc.rust-lang.org/std/fmt/trait.Debug.html
[다음 섹션]: result/early_returns.md
