## 자식 프로세스

`process::Output` 구조체는 완료된 자식 프로세스의 출력을 나타내며, `process::Command` 구조체는 프로세스 빌더입니다.

```rust,editable,ignore
use std::process::Command;

fn main() {
    let output = Command::new("rustc")
        .arg("--version")
        .output().unwrap_or_else(|e| {
            panic!("프로세스 실행 실패: {}", e)
    });

    if output.status.success() {
        let s = String::from_utf8_lossy(&output.stdout);

        print!("rustc 성공 및 stdout는:\n{}", s);
    } else {
        let s = String::from_utf8_lossy(&output.stderr);

        print!("rustc 실패 및 stderr는:\n{}", s);
    }
}
```

( `rustc` 에 잘못된 플래그가 전달된 경우 이전 예제를 시도해 보세요)
