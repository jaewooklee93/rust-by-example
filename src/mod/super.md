## `super`와 `self`

`super`와 `self` 키워드는 항목에 액세스할 때 모호성을 제거하고 불필요한 경로의 고정값을 방지하는 데 사용할 수 있습니다.

```rust,editable
fn function() {
    println!("called `function()`");
}

mod cool {
    pub fn function() {
        println!("called `cool::function()`");
    }
}

mod my {
    fn function() {
        println!("called `my::function()`");
    }
    
    mod cool {
        pub fn function() {
            println!("called `my::cool::function()`");
        }
    }
    
    pub fn indirect_call() {
        // 현재 스코프에서 이름이 `function`인 모든 함수에 액세스하겠습니다!
        print!("called `my::indirect_call()`, that\n> ");
        
        // `self` 키워드는 현재 모듈 스코프를 가리킵니다. 이 경우 `my`입니다.
        // `self::function()`을 호출하고 `function()`을 직접 호출하는 것 모두
        // 같은 결과를 낳습니다. 왜냐하면 같은 함수를 가리키기 때문입니다.
        self::function();
        function();
        
        // `self`를 사용하여 `my` 안의 다른 모듈에 액세스할 수도 있습니다.
        self::cool::function();
        
        // `super` 키워드는 부모 스코프를 가리킵니다. (`my` 모듈 외부)
        super::function();
        
        // 이것은 `crate` 스코프의 `cool::function`에 바인딩됩니다.
        // 이 경우 `crate` 스코프는 가장 외부 스코프입니다.
        {
            use crate::cool::function as root_function;
            root_function();
        }
    }
}

fn main() {
    my::indirect_call();
}
```
