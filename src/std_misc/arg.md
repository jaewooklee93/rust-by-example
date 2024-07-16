## 프로그램 인수

### 표준 라이브러리

명령줄 인수는 `std::env::args`를 사용하여 액세스할 수 있습니다. 이 함수는 각 인수에 대한 `String`을 반환하는 이터레이터를 반환합니다.

```rust,editable
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    // 첫 번째 인수는 프로그램을 호출하기 위해 사용된 경로입니다.
    println!("My path is {}.", args[0]);

    // 나머지 인수는 전달된 명령줄 매개변수입니다.
    // 프로그램을 다음과 같이 호출합니다:
    //   $ ./args arg1 arg2
    println!("I got {:?} arguments: {:?}.", args.len() - 1, &args[1..]);
}
```

```shell
$ ./args 1 2 3
My path is ./args.
I got 3 arguments: ["1", "2", "3"].
```

### Crate

또는 명령줄 응용 프로그램을 작성할 때 추가 기능을 제공하는 여러 Crate가 있습니다. `clap`와 같은 명령줄 인수 Crate 중 하나가 더 인기가 있습니다.

[`clap`]: https://rust-cli.github.io/book/tutorial/cli-args.html#parsing-cli-arguments-with-clap
