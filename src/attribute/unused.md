## `dead_code`

컴파일러는 사용되지 않는 함수에 대해 경고를 내는 `dead_code`
[*라이너*][라이너]를 제공합니다. *속성*을 사용하여 라이너를 비활성화할 수 있습니다.

```rust,editable
fn used_function() {}

// `#[allow(dead_code)]` 속성은 `dead_code` 라이너를 비활성화합니다
#[allow(dead_code)]
fn unused_function() {}

fn noisy_unused_function() {}
// FIXME ^ 경고를 억제하는 속성을 추가하세요

fn main() {
    used_function();
}
```

실제 프로그램에서는 죽은 코드를 제거해야 합니다. 이 예제에서는 상호 작용적인 본질 때문에 일부 위치에서 죽은 코드를 허용합니다.

[라이너]: https://ko.wikipedia.org/wiki/라이너_(소프트웨어)
