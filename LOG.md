1. add `yarn add @angular/localize`
2. import `import {} from "@angular/localize/init";`
   - not sure why need to import form `{}`

---

```typescript
http://yourserver/en/[..path]
http://sk.yourserver/[..path]

const fn () => {
   useWatch$(() => {
      state.done = $localize`Done`;
   });
   return <span>$localize`You have ${count} emails since ${date}!`</span>
}

try {
   $loalize.transaltion = ...;
   fn();
} finally {
   $loalize.transaltion = null;
}
$localize`Since ${date} you have ${count}!`
```

<span i18n-id="12345">123, 1/1/2022</span>
