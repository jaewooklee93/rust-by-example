## 별칭

`type` 문은 기존 유형에 새로운 이름을 부여하는 데 사용할 수 있습니다. 유형은 `UpperCamelCase` 이름을 가져야 하며, 컴파일러가 경고를 발생시킵니다. 이 규칙의 예외는 기본 유형입니다: `usize`, `f32` 등

```rust,editable
// `NanoSecond`, `Inch`, 그리고 `U64`는 `u64`에 대한 새로운 이름입니다.
type NanoSecond = u64;
type Inch = u64;
type U64 = u64;

fn main() {
    // `NanoSecond` = `Inch` = `U64` = `u64`입니다.
    let nanoseconds: NanoSecond = 5 as u64;
    let inches: Inch = 2 as U64;

    // 유형 별칭이 *추가적인 유형 안전성을 제공하지 않는다는 점에 유의하세요*,
    // 별칭은 *새로운 유형이 아닙니다* 
    println!("{} nanoseconds + {} inches = {} unit?",
             nanoseconds,
             inches,
             nanoseconds + inches);
}
```

별칭의 주요 사용법은 boilerplate를 줄이는 것입니다. 예를 들어 `io::Result<T>` 유형은 `Result<T, io::Error>` 유형의 별칭입니다.

### 참조:

[속성](../attribute.md)
