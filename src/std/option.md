## `Option`

프로그램의 일부가 실패할 수 있는 경우 `panic!`를 호출하는 대신 실패를 처리하는 것이 좋습니다. 이것은 `Option` 열거형을 사용하여 달성할 수 있습니다.

`Option<T>` 열거형은 두 가지 변형이 있습니다.

* `None`, 값이 없거나 실패를 나타내기 위해 사용되며,
* `Some(value)`, `value`를 감싸는 튜플 구조입니다. `T` 유형입니다.

```rust,editable,ignore,mdbook-runnable
// 0으로 나누는 경우 `panic!`를 호출하지 않는 정수 나눗셈
fn checked_division(dividend: i32, divisor: i32) -> Option<i32> {
    if divisor == 0 {
        // 실패는 `None` 변형으로 나타납니다
        None
    } else {
        // 결과는 `Some` 변형으로 감싸집니다
        Some(dividend / divisor)
    }
}

// 성공하지 않을 수 있는 나눗셈을 처리하는 함수
fn try_division(dividend: i32, divisor: i32) {
    // `Option` 값은 다른 열거형과 마찬가지로 패턴 매칭할 수 있습니다.
    match checked_division(dividend, divisor) {
        None => println!("{} / {} 실패!", dividend, divisor),
        Some(quotient) => {
            println!("{} / {} = {}", dividend, divisor, quotient)
        },
    }
}

fn main() {
    try_division(4, 2);
    try_division(1, 0);

    // `None`을 변수에 바인딩하려면 유형을 명시적으로 지정해야 합니다.
    let none: Option<i32> = None;
    let _equivalent_none = None::<i32>;

    let optional_float = Some(0f32);

    // `Some` 변형을 풀면 감싸진 값이 추출됩니다.
    println!("{:?} unwraps to {:?}", optional_float, optional_float.unwrap());

    // `None` 변형을 풀면 `panic!`가 발생합니다.
    println!("{:?} unwraps to {:?}", none, none.unwrap());
}
```
