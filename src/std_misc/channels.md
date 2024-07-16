## 채널

Rust는 스레드 간 소통을 위한 비동기 `채널`을 제공합니다. 채널은 정보의 단방향 흐름을 두 개의 끝점, 즉 `Sender`와 `Receiver` 사이에서 허용합니다.

```rust,editable
use std::sync::mpsc::{Sender, Receiver};
use std::sync::mpsc;
use std::thread;

static NTHREADS: i32 = 3;

fn main() {
    // 채널은 두 개의 끝점을 가지는데, `Sender<T>`와 `Receiver<T>`이며, `T`는 전송되는 메시지의 유형입니다.
    // (유형 선언은 불필요합니다)
    let (tx, rx): (Sender<i32>, Receiver<i32>) = mpsc::channel();
    let mut children = Vec::new();

    for id in 0..NTHREADS {
        // 전송자 끝점은 복사할 수 있습니다
        let thread_tx = tx.clone();

        // 각 스레드는 채널을 통해 자신의 ID를 전송합니다
        let child = thread::spawn(move || {
            // 스레드는 `thread_tx`를 소유하게 됩니다
            // 각 스레드는 채널에 메시지를 큐에 넣습니다
            thread_tx.send(id).unwrap();

            // 전송은 비동기 작업이며, 스레드는 메시지를 전송한 후 즉시 계속됩니다
            println!("thread {} finished", id);
        });

        children.push(child);
    }

    // 여기서 모든 메시지가 수집됩니다
    let mut ids = Vec::with_capacity(NTHREADS as usize);
    for _ in 0..NTHREADS {
        // `recv` 메서드는 채널에서 메시지를 하나 선택합니다
        // `recv`는 채널에 메시지가 없으면 현재 스레드를 차단합니다
        ids.push(rx.recv());
    }
    
    // 스레드가 남은 작업을 완료할 때까지 기다립니다
    for child in children {
        child.join().expect("oops! the child thread panicked");
    }

    // 메시지가 전송된 순서를 표시합니다
    println!("{:?}", ids);
}
```
