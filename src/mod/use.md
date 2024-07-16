## `use` 선언문

`use` 선언문은 전체 경로를 새 이름에 바인딩하여 액세스를 용이하게 할 수 있습니다.
다음과 같이 자주 사용됩니다.

```rust,editable,ignore
use crate::deeply::nested::{
    my_first_function,
    my_second_function,
    AndATraitType
};

fn main() {
    my_first_function();
}
```

`as` 키워드를 사용하여 임포트를 다른 이름에 바인딩할 수 있습니다.

```rust,editable
// `deeply::nested::function` 경로를 `other_function`으로 바인딩합니다.
use deeply::nested::function as other_function;

fn function() {
    println!("called `function()`");
}

mod deeply {
    pub mod nested {
        pub fn function() {
            println!("called `deeply::nested::function()`");
        }
    }
}

fn main() {
    // `deeply::nested::function`에 더 쉬운 액세스
    other_function();

    println!("Entering block");
    {
        // 이것은 `use crate::deeply::nested::function as function`과 동일합니다.
        // 이 `function()`은 외부 함수를 가리킵니다.
        use crate::deeply::nested::function;

        // `use` 바인딩은 지역 범위를 가지고 있습니다. 이 경우,
        // `function()`의 가리키는 함수가 이 블록 안에서만 덮어쓰입니다.
        function();

        println!("Leaving block");
    }

    function();
}
```
