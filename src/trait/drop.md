## Drop

[`Drop`][Drop] 트레이트는 `drop` 메서드 하나만 가지고 있습니다. 이 메서드는 객체가 스코프 밖으로 나갈 때 자동으로 호출됩니다. `Drop` 트레이트의 주요 용도는 구현 객체가 소유한 리소스를 해제하는 것입니다.

`Box`, `Vec`, `String`, `File`, `Process`와 같은 유형은 리소스를 해제하기 위해 `Drop` 트레이트를 구현하는 예입니다. `Drop` 트레이트는 사용자 정의 데이터 유형에도 수동으로 구현할 수 있습니다.

다음 예제는 `drop` 함수에 콘솔에 출력을 추가하여 호출될 때 알림을 표시합니다.

```rust,editable
struct Droppable {
    name: &'static str,
}

// `drop`의 이 사소한 구현은 콘솔에 출력을 추가합니다.
impl Drop for Droppable {
    fn drop(&mut self) {
        println!("> Dropping {}", self.name);
    }
}

fn main() {
    let _a = Droppable { name: "a