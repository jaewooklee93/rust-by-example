## 함수

[elision]을 무시하면, 라이프타임이 있는 함수 서명에는 몇 가지 제약 사항이 있습니다.

* 모든 참조는 반드시 해당 라이프타임이 지정되어야 합니다.
* 반환되는 모든 참조는 입력 참조와 동일한 라이프타임이어야 하거나 `static`이어야 합니다.

또한, 입력이 없는 참조를 반환하는 것은 유효하지 않은 데이터에 대한 참조를 반환하는 경우 금지됩니다. 다음 예제는 라이프타임이 있는 함수의 유효한 형태를 보여줍니다.

```rust,editable
// 라이프타임 `'a`를 가진 하나의 입력 참조가 함수가 실행되는 동안
// 적어도 동일한 시간 동안 유효해야 합니다.
fn print_one<'a>(x: &'a i32) {
    println!("`print_one`: x is {}", x);
}

// 라이프타임과 함께 변경 가능한 참조도 가능합니다.
fn add_one<'a>(x: &'a mut i32) {
    *x += 1;
}

// 다른 라이프타임을 가진 여러 요소.
// 이 경우 두 요소 모두 `'a`라는 동일한 라이프타임을 가질 수 있지만,
// 더 복잡한 경우에는 다른 라이프타임이 필요할 수 있습니다.
fn print_multi<'a, 'b>(x: &'a i32, y: &'b i32) {
    println!("`print_multi`: x is {}, y is {}", x, y);
}

// 전달된 참조를 반환하는 것은 허용됩니다.
// 그러나 올바른 라이프타임이 반환되어야 합니다.
fn pass_x<'a, 'b>(x: &'a i32, _: &'b i32) -> &'a i32 { x }

//fn invalid_output<'a>() -> &'a String { &String::from("foo") }
// 위 코드는 유효하지 않습니다.: `'a`는 함수보다 더 오래 유효해야 합니다.
// 여기서 `&String::from("foo")`는 `String`을 생성한 후 참조를 생성합니다.
// 그런 다음 함수의 범위를 벗어나면 데이터가 삭제되고,
// 유효하지 않은 데이터에 대한 참조가 반환됩니다.

fn main() {
    let x = 7;
    let y = 9;
    
    print_one(&x);
    print_multi(&x, &y);
    
    let z = pass_x(&x, &y);
    print_one(z);

    let mut t = 3;
    add_one(&mut t);
    print_one(&t);
}
```

### 참조:

[함수][fn]

[fn]: ../../fn.md

[elision]: elision.md
