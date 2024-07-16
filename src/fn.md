## 함수

함수는 `fn` 키워드를 사용하여 선언합니다. 인수는 변수와 마찬가지로 타입을 지정하고, 함수가 값을 반환하는 경우, 화살표 `->` 뒤에 반환 타입을 명시해야 합니다.

함수의 마지막 표현식은 반환 값으로 사용됩니다. 또는 `return` 문을 사용하여 함수 내부에서, 루프나 `if` 문 안에서조차 값을 일찍 반환할 수 있습니다.

FizzBuzz를 함수를 사용하여 다시 작성해 보겠습니다!

```rust,editable
// C/C++와 달리 함수 정의 순서에 제약이 없습니다
fn main() {
    // 여기서 이 함수를 사용할 수 있으며, 나중에 어디에서든 정의할 수 있습니다
    fizzbuzz_to(100);
}

// boolean 값을 반환하는 함수
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
    // 경계 사례, 일찍 반환
    if rhs == 0 {
        return false;
    }

    // 이것은 표현식이며, `return` 키워드가 필요하지 않습니다
    lhs % rhs == 0
}

// 값을 "반환하지 않는" 함수는 실제로 단위 유형 `()`을 반환합니다
fn fizzbuzz(n: u32) -> () {
    if is_divisible_by(n, 15) {
        println!("fizzbuzz");
    } else if is_divisible_by(n, 3) {
        println!("fizz");
    } else if is_divisible_by(n, 5) {
        println!("buzz");
    } else {
        println!("{}", n);
    }
}

// 함수가 `()`을 반환하는 경우, 반환 타입을 서명에서 생략할 수 있습니다
fn fizzbuzz_to(n: u32) {
    for n in 1..=n {
        fizzbuzz(n);
    }
}
```
