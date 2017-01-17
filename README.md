# fis3-parser-gfe-widget-inline
fis3-parser-gfe-widget-inline


## INSTALL

```bash
npm install [-g] fis3-parser-gfe-widget-inline
```

## USE

```js
fis.match('/html/**.{html,ftl}', {
    parser: fis.plugin('gfe-widget-inline',{
		widget:{}//widget对象
	})
});
```