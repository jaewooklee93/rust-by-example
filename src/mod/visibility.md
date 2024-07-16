## 가시성

기본적으로 모듈의 항목은 개인적인 가시성을 가지지만, `pub` 수정자로 이를 변경할 수 있습니다. 모듈의 공개 항목만 모듈 범위 외부에서 액세스할 수 있습니다.

```rust,editable
// `my_mod`라는 이름의 모듈
mod my_mod {
    // 모듈의 항목은 기본적으로 개인적인 가시성을 갖습니다.
    fn private_function() {
        println!("called `my_mod::private_function()`");
    }

    // `pub` 수정자를 사용하여 기본 가시성을 변경합니다.
    pub fn function() {
        println!("called `my_mod::function()`");
    }

    // 모듈 내의 다른 항목은, 개인적이더라도 액세스할 수 있습니다.
    pub fn indirect_access() {
        print!("called `my_mod::indirect_access()`, that\n> ");
        private_function();
    }

    // 모듈은 또한 중첩될 수 있습니다
    pub mod nested {
        pub fn function() {
            println!("called `my_mod::nested::function()`");
        }

        #[allow(dead_code)]
        fn private_function() {
            println!("called `my_mod::nested::private_function()`");
        }

        // `pub(in path)` 문법으로 선언된 함수는 지정된 경로 내에서만 보입니다. `path`는 부모 또는 조상 모듈이어야 합니다
        pub(in crate::my_mod) fn public_function_in_my_mod() {
            print!("called `my_mod::nested::public_function_in_my_mod()`, that\n> ");
            public_function_in_nested();
        }

        // `pub(self)` 문법으로 선언된 함수는 현재 모듈 내에서만 보입니다. 즉, 개인적인 것으로 남습니다.
        pub(self) fn public_function_in_nested() {
            println!("called `my_mod::nested::public_function_in_nested()`");
        }

        // `pub(super)` 문법으로 선언된 함수는 부모 모듈 내에서만 보입니다.
        pub(super) fn public_function_in_super_mod() {
            println!("called `my_mod::nested::public_function_in_super_mod()`");
        }
    }

    pub fn call_public_function_in_my_mod() {
        print!("called `my_mod::call_public_function_in_my_mod()`, that\n> ");
        nested::public_function_in_my_mod();
        print!("> ");
        nested::public_function_in_super_mod();
    }

    // `pub(crate)`는 함수가 현재 크레인 내에서만 보이도록 합니다.
    pub(crate) fn public_function_in_crate() {
        println!("called `my_mod::public_function_in_crate()`");
    }

    // 중첩된 모듈은 가시성 규칙을 따릅니다.
    mod private_nested {
        #[allow(dead_code)]
        pub fn function() {
            println!("called `my_mod::private_nested::function()`");
        }

        // 개인적인 부모 항목은 자식 항목의 가시성을 제한할 수 있습니다.
        // 자식 항목이 더 큰 범위에서 가시성을 갖도록 선언되어 있더라도
        #[allow(dead_code)]
        pub(crate) fn restricted_function() {
            println!("called `my_mod::private_nested::restricted_function()`");
        }
    }
}

fn function() {
    println!("called `function()`");
}

fn main() {
    // 모듈은 동일한 이름을 가진 항목 간의 해당을 허용합니다.
    function();
    my_mod::function();

    // 공개 항목, 중첩된 모듈 내의 항목도 포함하여, 부모 모듈 외부에서 액세스할 수 있습니다.
    my_mod::indirect_access();
    my_mod::nested::function();
    my_mod::call_public_function_in_my_mod();

    // `pub(crate)` 항목은 같은 크레인 내에서 어디에서든 호출할 수 있습니다.
    my_mod::public_function_in_crate();

    // `pub(in path)` 항목은 지정된 모듈 내에서만 호출할 수 있습니다.
    // 오류! 함수 `public_function_in_my_mod`는 개인적입니다
    //my_mod::nested::public_function_in_my_mod();
    // TODO ^ 해당 줄을 주석 해제해 보세요

    // 모듈의 개인적인 항목은, 중첩된 모듈이라도 직접 액세스할 수 없습니다:

    // 오류! `private_function`은 개인적입니다
    //my_mod::private_function();
    // TODO ^ 해제하려면 이 줄을 주석 처리 해제

    // 오류! `private_function`은 개인입니다.
    //my_mod::nested::private_function();
    // TODO ^ 해제하려면 이 줄을 주석 처리 해제

    // 오류! `private_nested`은 개인 모듈입니다.
    //my_mod::private_nested::function();
    // TODO ^ 해제하려면 이 줄을 주석 처리 해제

    // 오류! `private_nested`은 개인 모듈입니다.
    //my_mod::private_nested::restricted_function();
    // TODO ^ 해제하려면 이 줄을 주석 처리 해제
}
```
