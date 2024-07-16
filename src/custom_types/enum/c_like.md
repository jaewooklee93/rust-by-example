## C와 유사한 형식

`enum`은 C와 유사한 형식으로 사용할 수 있습니다.

```rust,editable
// 사용되지 않는 코드에 대한 경고를 숨기는 속성
#![allow(dead_code)]

// 묵시적 구분자를 가진 enum (0부터 시작)
enum Number {
    Zero,
    One,
    Two,
}

// 명시적 구분자를 가진 enum
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}

fn main() {
    // `enums`는 정수로 형변환될 수 있습니다.
    println!("zero is {}", Number::Zero as i32);
    println!("one is {}", Number::One as i32);

    println!("장미는 #{:06x}", Color::Red as i32);
    println!("무궁화는 #{:06x}", Color::Blue as i32);
}
```

### 참조:

[형변환][cast]

[cast]: ../../types/cast.md
