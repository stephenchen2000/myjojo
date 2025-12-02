# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "Storybook Components Demo" [level=1] [ref=e4]
  - generic [ref=e5]:
    - heading "Buttons" [level=2] [ref=e6]
    - generic [ref=e7]:
      - button "Primary" [ref=e8] [cursor=pointer]
      - button "Secondary" [ref=e9] [cursor=pointer]
      - button "Danger" [ref=e10] [cursor=pointer]
  - generic [ref=e11]:
    - heading "Counter" [level=2] [ref=e12]
    - button "Count is 0" [ref=e13] [cursor=pointer]
  - generic [ref=e14]:
    - heading "Tasks" [level=2] [ref=e15]
    - generic [ref=e16]:
      - listitem "task-1" [ref=e17]:
        - generic "archiveTask-1" [ref=e18] [cursor=pointer]:
          - button "archiveButton-1" [ref=e19]
        - generic "Learn Storybook" [ref=e20]:
          - textbox "Learn Storybook" [active] [ref=e21]:
            - /placeholder: Input title
        - button "pin" [ref=e22] [cursor=pointer]:
          - generic [ref=e23]: ⭐
      - listitem "task-2" [ref=e24]:
        - generic "archiveTask-2" [ref=e25] [cursor=pointer]:
          - button "archiveButton-2" [ref=e26]
        - generic "Build components" [ref=e27]:
          - textbox "Build components" [ref=e28]:
            - /placeholder: Input title
        - button "unpin" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: 📌
      - listitem "task-3" [ref=e31]:
        - generic "archiveTask-3" [ref=e32] [cursor=pointer]:
          - button "archiveButton-3" [ref=e33]
        - generic "Write tests" [ref=e34]:
          - textbox "Write tests" [ref=e35]:
            - /placeholder: Input title
```