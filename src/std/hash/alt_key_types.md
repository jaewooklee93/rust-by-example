## 다른/사용자 정의 키 유형

`HashMap`에서 키로 사용할 수 있는 유형은 `Eq` 및 `Hash` 트레이트를 구현하는 모든 유형입니다.
다음이 포함됩니다.

* `bool` (두 가지만 가능하기 때문에 별로 유용하지 않음)
* `int`, `uint`, 및 그 모든 변형
* `String` 및 `&str` (팁: `String` 키로 `HashMap`를 만들고 `&str`로 `.get()`을 호출할 수 있습니다)

`f32` 및 `f64`는 `Hash`를 구현하지 않습니다.
[플로팅 포인트 정밀도 오류][floating] 때문에 해시맵 키로 사용하는 것이 매우 오류 위험하기 때문입니다.

모든 컬렉션 클래스는 포함된 유형이 각각 `Eq` 및 `Hash`를 구현하면 `Eq` 및 `Hash`를 구현합니다.
예를 들어, `Vec<T>`는 `T`가 `Hash`를 구현하면 `Hash`를 구현합니다.

`#[derive(PartialEq, Eq, Hash)]`으로 하나의 줄만으로 사용자 정의 유형에 대해 `Eq` 및 `Hash`를 구현할 수 있습니다.

컴파일러가 나머지를 처리합니다. `Eq` 또는 `Hash`를 직접 구현하는 데 더 많은 제어를 원하면 구현할 수 있습니다.
이 가이드에서는 `Hash` 구현의 세부 사항을 다루지 않습니다.

`struct`를 `HashMap`에서 사용하는 방법을 시험해 보려면 매우 간단한 사용자 로그인 시스템을 만들어 보겠습니다.

```rust,editable
use std::collections::HashMap;

// Eq는 유형에 PartialEq를 유도해야 합니다.
#[derive(PartialEq, Eq, Hash)]
struct Account<'a>{
    username: &'a str,
    password: &'a str,
}

struct AccountInfo<'a>{
    name: &'a str,
    email: &'a str,
}

type Accounts<'a> = HashMap<Account<'a>, AccountInfo<'a>>;

fn try_logon<'a>(accounts: &Accounts<'a>,
        username: &'a str, password: &'a str){
    println!("Username: {}", username);
    println!("Password: {}", password);
    println!("Attempting logon...");

    let logon = Account {
        username,
        password,
    };

    match accounts.get(&logon) {
        Some(account_info) => {
            println!("Successful logon!");
            println!("Name: {}", account_info.name);
            println!("Email: {}", account_info.email);
        },
        _ => println!("Login failed!"),
    }
}

fn main(){
    let mut accounts: Accounts = HashMap::new();

    let account = Account {
        username: "j.everyman",
        password: "password123",
    };

    let account_info = AccountInfo {
        name: "John Everyman",
        email: "j.everyman@email.com",
    };

    accounts.insert(account, account_info);

    try_logon(&accounts, "j.everyman", "psasword123");

    try_logon(&accounts, "j.everyman", "password123");
}
```

[hash]: https://en.wikipedia.org/wiki/Hash_function
[floating]: https://en.wikipedia.org/wiki/Floating-point#Accuracy_problems
