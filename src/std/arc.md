## Arc

 여러 스레드 간 공유 소유권이 필요한 경우 `Arc`(Atomically Reference
Counted)를 사용할 수 있습니다. 이 구조는 `Clone` 구현을 통해 메모리 힙에 있는 값의 위치에 대한 참조 포인터를 생성하면서 참조 카운터를 증가시킵니다. 여러 스레드가 소유권을 공유하기 때문에, 마지막 참조 포인터가 해당 값의 범위를 벗어나면 변수가 삭제됩니다.

```rust,editable
use std::time::Duration;
use std::sync::Arc;
use std::thread;

fn main() {
    // 이 변수 선언은 값이 지정되는 곳입니다.
    let apple = Arc::new("같은 사과");

    for _ in 0..10 {
        // 여기서는 참조 포인터로 메모리 힙에 있는 참조에 대한 값이 지정되지 않습니다.
        let apple = Arc::clone(&apple);

        thread::spawn(move || {
            // Arc가 사용되었기 때문에, Arc 변수 포인터의 위치에 할당된 값을 사용하여 스레드를 생성할 수 있습니다.
            println!("{:?}", apple);
        });
    }

    // 스레드에서 생성된 모든 Arc 인스턴스가 출력될 수 있도록 기다립니다.
    thread::sleep(Duration::from_secs(1));
}
```
