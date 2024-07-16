## 인수 분석

 매칭을 사용하여 간단한 인수를 분석할 수 있습니다.

```rust,editable
use std::env;

fn increase(number: i32) {
    println!("{}", number + 1);
}

fn decrease(number: i32) {
    println!("{}", number - 1);
}

fn help() {
    println!("사용법:
match_args <문자열>
    제공된 문자열이 정답인지 확인합니다.
match_args {{increase|decrease}} <정수>
    정수를 1 증가 또는 감소시킵니다.");
}

fn main() {
    let args: Vec<String> = env::args().collect();

    match args.len() {
        // 인수가 전달되지 않았음
        1 => {
            println!("My name is 'match_args'. 인수를 전달해 보세요!");
        },
        // 하나의 인수가 전달됨
        2 => {
            match args[1].parse() {
                Ok(42) => println!("This is the answer!"),
                _ => println!("This is not the answer."),
            }
        },
        // 하나의 명령어와 하나의 인수가 전달됨
        3 => {
            let cmd = &args[1];
            let num = &args[2];
            // 숫자를 분석합니다
            let number: i32 = match num.parse() {
                Ok(n) => {
                    n
                },
                Err(_) => {
                    eprintln!("오류: 두 번째 인수가 정수가 아닙니다");
                    help();
                    return;
                },
            };
            // 명령어를 분석합니다
            match &cmd[..] {
                "increase" => increase(number),
                "decrease" => decrease(number),
                _ => {
                    eprintln!("오류: 잘못된 명령어입니다");
                    help();
                },
            }
        },
        // 모든 다른 경우
        _ => {
            // 도움 메시지를 표시합니다
            help();
        }
    }
}
```

프로그램 이름을 `match_args.rs`로 하고 `rustc match_args.rs`와 같이 컴파일하면 다음과 같이 실행할 수 있습니다.

```shell
$ ./match_args Rust
This is not the answer.
$ ./match_args 42
This is the answer!
$ ./match_args do something
error: second argument not an integer
usage:
match_args <string>
    제공된 문자열이 정답인지 확인합니다.
match_args {increase|decrease} <integer>
    정수를 1 증가 또는 감소시킵니다.
$ ./match_args do 42
error: invalid command
usage:
match_args <string>
    제공된 문자열이 정답인지 확인합니다.
match_args {increase|decrease} <integer>
    정수를 1 증가 또는 감소시킵니다.
$ ./match_args increase 42
43
```
