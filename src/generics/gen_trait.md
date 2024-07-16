## Trait

물론 `trait`도 일반화될 수 있습니다. 여기서는 `Drop` `trait`를 재정의하는 일반적인 메서드를 정의하여 스스로와 입력을 삭제합니다.

```rust,editable
// 복사되지 않는 유형.
struct Empty;
struct Null;

// `T`에 대한 일반화된 trait.
trait DoubleDrop<T> {
    // 호출자 유형에서 추가적인 단일 매개변수 `T`를 가져오는 메서드를 정의하고 `T`와 아무것도 하지 않습니다.
    fn double_drop(self, _: T);
}

// 모든 일반 매개변수 `T`와 호출자 `U`에 대해 `DoubleDrop<T>`를 구현합니다.
impl<T, U> DoubleDrop<T> for U {
    // 이 메서드는 전달된 두 개의 인수를 소유하고, 두 개 모두를 해제합니다.
    fn double_drop(self, _: T) {}
}

fn main() {
    let empty = Empty;
    let null  = Null;

    // `empty`와 `null`을 해제합니다.
    empty.double_drop(null);

    //empty;
    //null;
    // ^ TODO: 이 줄들을 주석을 풀어보세요.
}
```

### 참조:

[`Drop`][Drop], [`struct`][structs], and [`trait`][traits]

[Drop]: https://doc.rust-lang.org/std/ops/trait.Drop.html
[structs]: ../custom_types/structs.md
[traits]: ../trait.md
