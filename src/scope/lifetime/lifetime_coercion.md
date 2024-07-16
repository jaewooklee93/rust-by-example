## 강제 변환

더 긴 유명은 일반적으로 작동하지 않는 범위 내에서 작동하도록 짧은 유명으로 강제 변환될 수 있습니다.
이는 Rust 컴파일러에서 유추되는 강제 변환의 형태로 나타나며, 유명 차이를 선언하는 형태로도 나타납니다.

```rust,editable
// 여기서 Rust는 가능한 한 짧은 유명을 유추합니다.
// 두 참조는 그 유명으로 강제 변환됩니다.
fn multiply<'a>(first: &'a i32, second: &'a i32) -> i32 {
    first * second
}

// `<'a: 'b, 'b>`는 유명 `'a`가 `'b` 이상이라는 것을 의미합니다.
// 여기서는 `&'a i32`를 입력받고, 강제 변환의 결과로 `&'b i32`를 반환합니다.
fn choose_first<'a: 'b, 'b>(first: &'a i32, _: &'b i32) -> &'b i32 {
    first
}

fn main() {
    let first = 2; // 더 긴 유명
    
    {
        let second = 3; // 짧은 유명
        
        println!("The product is {}", multiply(&first, &second));
        println!("{} is the first", choose_first(&first, &second));
    };
}
```
