## match

Rust는 `match` 키워드를 사용하여 패턴 매칭을 제공합니다. 이는 C의 `switch`와 유사하게 작동합니다. 첫 번째 매칭되는 암은 평가되며, 모든 가능한 값이 덮어져야 합니다.

```rust,editable
fn main() {
    let number = 13;
    // TODO ^ `number`에 다른 값을 시도해보세요

    println!("{}에 대해 말해줘", number);
    match number {
        // 하나의 값에 맞춤
        1 => println!("One!"),
        // 여러 값에 맞춤
        2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
        // TODO ^ 프라임 숫자 목록에 13을 추가해보세요
        // 포함적 범위에 맞춤
        13..=19 => println!("A teen"),
        // 나머지 경우를 처리
        _ => println!("Ain't special"),
        // TODO ^ 이 모든 경우를 처리하는 암을 주석 처리해보세요
    }

    let boolean = true;
    // match는 표현식이기도 합니다
    let binary = match boolean {
        // match의 암은 모든 가능한 값을 덮어야 합니다
        false => 0,
        true => 1,
        // TODO ^ 이 암 중 하나를 주석 처리해보세요
    };

    println!("{} -> {}", boolean, binary);
}
```
