## 테스트 케이스: 단위 명확화

단위 변환의 유용한 방법은 `Add`를 구현하여 살펴볼 수 있습니다.
`Add` 트레이트는 아래와 같이 검토됩니다.

```rust,ignore
// 이 구조는 `Self + RHS = Output`를 의미합니다.
// RHS는 구현에서 명시되지 않으면 기본적으로 Self로 설정됩니다.
pub trait Add<RHS = Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}

// `Output`는 `T<U>`여야 하므로 `T<U> + T<U> = T<U>`가 됩니다.
impl<U> Add for T<U> {
    type Output = T<U>;
    ...
}
```

전체 구현:

```rust,editable
use std::ops::Add;
use std::marker::PhantomData;

/// 빈 열거형을 만들어 단위 유형을 정의합니다.
#[derive(Debug, Clone, Copy)]
enum Inch {}
#[derive(Debug, Clone, Copy)]
enum Mm {}

/// `Length`는 팬텀 유형 매개변수 `Unit`를 가진 유형이며,
/// 길이 유형 (즉 `f64`)에 대해 일반화되지 않습니다.
///
/// `f64`는 이미 `Clone` 및 `Copy` 트레이트를 구현합니다.
#[derive(Debug, Clone, Copy)]
struct Length<Unit>(f64, PhantomData<Unit>);

/// `Add` 트레이트는 `+` 연산자의 동작을 정의합니다.
impl<Unit> Add for Length<Unit> {
    type Output = Length<Unit>;

    // add()는 합을 포함하는 새로운 `Length` 구조를 반환합니다.
    fn add(self, rhs: Length<Unit>) -> Length<Unit> {
        // `+`는 `f64`에 대한 `Add` 구현을 호출합니다.
        Length(self.0 + rhs.0, PhantomData)
    }
}

fn main() {
    // `one_foot`를 팬텀 유형 매개변수 `Inch`로 지정합니다.
    let one_foot:  Length<Inch> = Length(12.0, PhantomData);
    // `one_meter`는 팬텀 유형 매개변수 `Mm`를 가집니다.
    let one_meter: Length<Mm>   = Length(1000.0, PhantomData);

    // `+`는 `Length<Unit>`에 대해 구현한 `add()` 메서드를 호출합니다.
    //
    // `Length`가 `Copy`를 구현하므로 `add()`는 `one_foot`와 `one_meter`를 소비하지 않고
    // `self`와 `rhs`에 복사합니다.
    let two_feet = one_foot + one_foot;
    let two_meters = one_meter + one_meter;

    // 추가가 작동합니다.
    println!("one foot + one_foot = {:?} in", two_feet.0);
    println!("one meter + one_meter = {:?} mm", two_meters.0);

    // 의미 없는 연산은 예상대로 실패합니다:
    // 컴파일 시간 오류: 유형 불일치.
    //let one_feter = one_foot + one_meter;
}
```

### 참조:

[참조 (`&`)], [제한 (`X: Y`)], [열거형], [impl & self],
[재정의], [참조], [트레이트 (`X for Y`)] 및 [튜플 구조체].

[참조 (`&`)]: ../../scope/borrow.md
[제한 (`X: Y`)]: ../../generics/bounds.md
[열거형]: ../../custom_types/enum.md
[impl & self]: ../../fn/methods.md
[재정의]: ../../trait/ops.md
[참조]: ../../scope/borrow/ref.md
[트레이트 (`X for Y`)]: ../../trait.md
[튜플 구조체]: ../../custom_types/structs.md
[std::marker::PhantomData]: https://doc.rust-lang.org/std/marker/struct.PhantomData.html
