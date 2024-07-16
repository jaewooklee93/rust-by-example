## 기다리기

`process::Child`가 완료될 때까지 기다리고 싶다면 `Child::wait`를 호출해야 합니다. 이 함수는 `process::ExitStatus`를 반환합니다.

```rust,ignore
use std::process::Command;

fn main() {
    let mut child = Command::new("sleep").arg("5").spawn().unwrap();
    let _result = child.wait().unwrap();

    println!("main 함수 종료");
}
```

```bash
$ rustc wait.rs && ./wait
# `wait`가 5초 동안 실행되며 `sleep 5` 명령이 완료될 때까지 기다립니다
main 함수 종료
```
