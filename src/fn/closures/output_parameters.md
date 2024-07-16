## 출력 매개변수로서 익명 함수

입력 매개변수로 익명 함수를 사용할 수 있으므로, 출력 매개변수로 익명 함수를 반환하는 것도 가능합니다. 그러나 익명 함수 유형은 정의에 따라 알 수 없기 때문에 `impl Trait`를 사용하여 반환해야 합니다.

반환할 수 있는 유효한 트레이트는 다음과 같습니다.

* `Fn`
* `FnMut`
* `FnOnce`

이 외에도 `move` 키워드를 사용해야 합니다. 이 키워드는 모든 캡처가 값으로 발생한다는 것을 나타냅니다. 이는 참조로 발생하는 모든 캡처가 함수가 종료되자마자 무효화되어 익명 함수에 유효하지 않은 참조를 남기기 때문입니다.

```rust,editable
fn create_fn() -> impl Fn() {
    let text = "Fn".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnmut() -> impl FnMut() {
    let text = "FnMut".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnonce() -> impl FnOnce() {
    let text = "FnOnce".to_owned();

    move || println!("This is a: {}", text)
}

fn main() {
    let fn_plain = create_fn();
    let mut fn_mut = create_fnmut();
    let fn_once = create_fnonce();

    fn_plain();
    fn_mut();
    fn_once();
}
```

### 참조:

[`Fn`][fn], [`FnMut`][fnmut], [제네릭스][generics] 및 [impl Trait][impltrait].

[fn]: https://doc.rust-lang.org/std/ops/trait.Fn.html
[fnmut]: https://doc.rust-lang.org/std/ops/trait.FnMut.html
[generics]: ../../generics.md
[impltrait]: ../../trait/impl_trait.md
