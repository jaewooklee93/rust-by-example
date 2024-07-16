## 파이프

`std::Child` 구조체는 실행 중인 자식 프로세스를 나타내며, 파이프를 통해 기본 프로세스와의 상호 작용을 위한 `stdin`, `stdout` 및 `stderr` 핸들을 노출합니다.

```rust,ignore
use std::io::prelude::*;
use std::process::{Command, Stdio};

static PANGRAM: &'static str =
"the quick brown fox jumps over the lazy dog\n";

fn main() {
    // `wc` 명령어를 시작
    let mut cmd = if cfg!(target_family = "windows") {
        let mut cmd = Command::new("powershell");
        cmd.arg("-Command").arg("$input | Measure-Object -Line -Word -Character");
        cmd
    } else {
        Command::new("wc")
    };
    let process = match cmd
                                .stdin(Stdio::piped())
                                .stdout(Stdio::piped())
                                .spawn() {
        Err(why) => panic!("couldn't spawn wc: {}", why),
        Ok(process) => process,
    };

    // `wc`의 `stdin`에 문자열을 쓰기
    //
    // `stdin`은 `Option<ChildStdin>` 유형을 가지지만, 이 인스턴스가 반드시 하나를 가지고 있음을 알고 있으므로 직접 `unwrap`할 수 있습니다.
    match process.stdin.unwrap().write_all(PANGRAM.as_bytes()) {
        Err(why) => panic!("couldn't write to wc stdin: {}", why),
        Ok(_) => println!("sent pangram to wc"),
    }

    // `stdin`은 위의 호출 이후에 `drop`되며 파이프가 닫힙니다.
    //
    // 이것은 매우 중요하며, 그렇지 않으면 `wc`가 우리가 보낸 입력을 처리하지 않을 것입니다.

    // `stdout` 필드도 `Option<ChildStdout>` 유형을 가지므로 `unwrap`해야 합니다.
    let mut s = String::new();
    match process.stdout.unwrap().read_to_string(&mut s) {
        Err(why) => panic!("couldn't read wc stdout: {}", why),
        Ok(_) => print!("wc responded with:\n{}", s),
    }
}
```
