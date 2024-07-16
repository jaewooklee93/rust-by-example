## 테스트 케이스: 비어있는 경계

경계가 작동하는 방식의 결과로, `trait`가 어떤 기능도 포함하지 않더라도 여전히 경계로 사용할 수 있습니다. `Eq`와 `Copy`는 `std` 라이브러리에서 그러한 `trait`의 예입니다.

```rust,editable
struct Cardinal;
struct BlueJay;
struct Turkey;

trait Red {}
trait Blue {}

impl Red for Cardinal {}
impl Blue for BlueJay {}

// 이러한 함수는 해당 `trait`를 구현하는 유형에만 유효합니다. 트레이트가 비어 있는 것은 무관합니다.
fn red<T: Red>(_: &T)   -> &'static str { "red