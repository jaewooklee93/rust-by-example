## 보호 조건

A `match` *보호 조건*은 팔을 필터링하는 데 사용될 수 있습니다.

```rust,editable
#[allow(dead_code)]
enum Temperature {
    Celsius(i32),
    Fahrenheit(i32),
}

fn main() {
    let temperature = Temperature::Celsius(35);
    // ^ TODO `temperature`에 다른 값을 시도해보세요

    match temperature {
        Temperature::Celsius(t) if t > 30 => println!("{}C는 30 Celsius 이상입니다", t),
        // ^ `if 조건` 부분이 보호 조건입니다
        Temperature::Celsius(t) => println!("{}C는 30 Celsius 이하입니다", t),

        Temperature::Fahrenheit(t) if t > 86 => println!("{}F는 86 Fahrenheit 이상입니다", t),
        Temperature::Fahrenheit(t) => println!("{}F는 86 Fahrenheit 이하입니다", t),
    }
}
```

컴파일러가 모든 패턴이 매치 표현식에 의해 처리되었는지 확인할 때는 보호 조건을 고려하지 않습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    let number: u8 = 4;

    match number {
        i if i == 0 => println!("Zero"),
        i if i > 0 => println!("Greater than zero"),
        // _ => unreachable!("Should never happen."),
        // TODO ^ 컴파일 오류 해결을 위해 주석을 제거하세요
    }
}
```

### 참조:

[튜플](../../primitives/tuples.md)
[열거형](../../custom_types/enum.md)
