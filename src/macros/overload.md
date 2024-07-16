## 과부하

매크로는 다양한 인수 조합을 받도록 과부하될 수 있습니다. 
이러한 관점에서 `macro_rules!`는 `match` 블록과 유사하게 작동할 수 있습니다.

```rust,editable
// `test!`는 `$left`와 `$right`를
// 다양한 방식으로 비교합니다.
// 어떻게 호출하는지에 따라 다릅니다.
macro_rules! test {
    // 인수는 쉼표로 구분할 필요가 없습니다.
    // 어떤 템플릿이든 사용할 수 있습니다!
    ($left:expr; and $right:expr) => {
        println!("{:?} and {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left && $right)
    };
    // ^ 각 팔은 세미콜론으로 끝나야 합니다.
    ($left:expr; or $right:expr) => {
        println!("{:?} or {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left || $right)
    };
}

fn main() {
    test!(1i32 + 1 == 2i32; and 2i32 * 2 == 4i32);
    test!(true; or false);
}
```
