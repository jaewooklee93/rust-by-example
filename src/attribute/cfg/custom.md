## 사용자 정의

`target_os`와 같은 일부 조건은 `rustc`에서 암시적으로 제공되지만, 사용자 정의 조건은 `--cfg` 플래그를 사용하여 `rustc`로 전달해야 합니다.

```rust,editable,ignore,mdbook-runnable
#[cfg(some_condition)]
fn conditional_function() {
    println!("condition met!");
}

fn main() {
    conditional_function();
}
```

사용자 정의 `cfg` 플래그 없이 실행해보세요.

사용자 정의 `cfg` 플래그를 사용하면:

```shell
$ rustc --cfg some_condition custom.rs && ./custom
condition met!
```
