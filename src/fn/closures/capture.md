## 캡처

클로저는 본질적으로 유연하며, 클로저가 작동하도록 필요한 기능을 수행합니다.
이를 통해 클로저는 사용 사례에 따라 유연하게 적응하며, 때로는 이동하고 때로는 참조합니다.
클로저는 변수를 캡처할 수 있습니다.

* 참조로: `&T`
* 변경 가능한 참조로: `&mut T`
* 값으로: `T`

클로저는 우선 참조로 변수를 캡처하며, 필요에 따라 낮은 레벨로 이동합니다.

```rust,editable
fn main() {
    use std::mem;
    
    let color = String::from("green");

    // `color`를 출력하는 클로저. `color`에 대한 즉각적인 참조를 가져와 클로저와 함께 `print` 변수에 저장합니다.
    // `print`가 마지막으로 사용될 때까지 참조와 클로저가 유지됩니다.
    //
    // `println!`은 불변 참조만으로 인수를 요구하므로 더 제한적인 조건을 부과하지 않습니다.
    let print = || println!("`color`: {}", color);

    // 참조를 사용하여 클로저를 호출합니다.
    print();

    // 클로저는 `color`에 대한 불변 참조만 가지고 있기 때문에 `color`는 다시 불변 참조로 대여될 수 있습니다.
    let _reborrow = &color;
    print();

    // `print`를 마지막으로 사용한 후 이동 또는 재참조가 허용됩니다.
    let _color_moved = color;


    let mut count = 0;
    // `count`를 증가시키는 클로저는 `&mut count` 또는 `count`를 가져올 수 있지만, `&mut count`가 덜 제한적이므로 그렇게 가져옵니다.
    // `inc`는 `&mut`를 저장하기 때문에 즉시 `count`를 대여합니다.
    // `mut`는 `inc`에 필요하기 때문에 클로저를 호출하면 `count`가 변경됩니다.
    let mut inc = || {
        count += 1;
        println!("`count`: {}", count);
    };

    // 변경 가능한 참조를 사용하여 클로저를 호출합니다.
    inc();

    // 클로저는 `count`에 대한 변경 가능한 참조를 여전히 가지고 있기 때문에 나중에 호출할 때 재참조가 불가능합니다.
    // let _reborrow = &count; 
    // ^ TODO: 위 줄을 해제해보세요.
    inc();

    // 클로저는 `&mut count`에 대한 참조가 더 이상 필요하지 않기 때문에 재참조가 가능합니다.
    let _count_reborrowed = &mut count; 

    
    // 비복사 유형.
    let movable = Box::new(3);

    // `mem::drop`는 `T`를 필요로 하므로 이 클로저는 값으로 가져옵니다. 복사 유형은 클로저로 복사되어 원본이 손상되지 않습니다.
    // 비복사 유형은 클로저로 이동되어 `movable`는 즉시 이동합니다.
    let consume = || {
        println!("`movable`: {:?}", movable);
        mem::drop(movable);
    };

    // `consume`는 변수를 소비하므로 한 번만 호출할 수 있습니다.
    consume();
    // consume();
    // ^ TODO: 위 줄을 해제해보세요.
}
```

`move`를 클로저의 수직 파이프 앞에 사용하면 클로저가 캡처된 변수의 소유권을 가져옵니다.

```rust,editable
fn main() {
    // `Vec`는 비복사 유형입니다.
    let haystack = vec![1, 2, 3];

    let contains = move |needle| haystack.contains(needle);

    println!("{}", contains(&1));
    println!("{}", contains(&4));

    // println!("There're {} elements in vec", haystack.len());
    // ^ 위 줄을 해제하면 컴파일 시 오류가 발생합니다.
    // 변수가 이동된 후 다시 사용할 수 없기 때문입니다.
    
    // 클로저의 signature에서 `move`를 제거하면 클로저는 _haystack_ 변수를 불변 참조로 대여합니다.
    // 따라서 _haystack_는 여전히 사용 가능하며 위 줄을 해제하면 오류가 발생하지 않습니다.
}
```

### 참조:

[`Box`][box] 및 [`std::mem::drop`][drop]

[box]: ../../std/box.md
[drop]: https://doc.rust-lang.org/std/mem/fn.drop.html
