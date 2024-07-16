## 중첩 및 레이블

중첩된 루프를 다룰 때 `break` 또는 `continue`를 사용하여 외부 루프를 종료하거나 건너뛰는 것이 가능합니다. 이러한 경우 루프는 몇 가지 `'label'`로 표시되어야 하며, `label`은 `break`/`continue` 문에 전달되어야 합니다.

```rust,editable
#![allow(unreachable_code, unused_labels)]

fn main() {
    'outer: loop {
        println!("외부 루프에 진입했습니다");

        'inner: loop {
            println!("내부 루프에 진입했습니다");

            // 이것은 내부 루프만 종료합니다.
            //break;

            // 이것은 외부 루프를 종료합니다.
            break 'outer;
        }

        println!("이 지점은 절대 도달되지 않습니다");
    }

    println!("외부 루프를 나왔습니다");
}
```
