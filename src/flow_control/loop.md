## loop

Rust는 무한 루프를 나타내는 `loop` 키워드를 제공합니다.

`break` 문은 언제든 루프에서 나갈 수 있도록 사용되며, `continue` 문은 현재 반복의 나머지를 건너뛰고 새로운 반복을 시작하는 데 사용됩니다.

```rust,editable
fn main() {
    let mut count = 0u32;

    println!("무한히 카운트하자!");

    // 무한 루프
    loop {
        count += 1;

        if count == 3 {
            println!("세");

            // 현재 반복의 나머지를 건너뛰기
            continue;
        }

        println!("{}", count);

        if count == 5 {
            println!("됐어요, 충분합니다");

            // 이 루프에서 나가기
            break;
        }
    }
}
```
