不加布局样式

![image-20211202115510462](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202115510462.png)

给$body$加上

```css
body{
	display: flex; //flex布局
	flex-direction: column;//主轴为纵轴,默认从上到下排列
	align-items: center;//设置元素在横轴上中心排列
}
```

![image-20211202120033717](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202120033717.png)

由于希望按钮是纵向排列,给$button$设置样式

```css
button{
    cursor:pointer;
    display: block;//块级元素换行
    background-color: #fff;
    border: solid 1px #111;
    margin-bottom: 20px;
    border-radius:5px;
    width:100%;
    padding:10px;
    font-weight: bold;
    font-size:14px;
}
```

![image-20211202120156060](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202120156060.png)

最下面的$Person\ Wealth$应该和左边的按钮在不同的列,可以对外围的$div$设置一下$flex$布局

```css
.container{
    display: flex;
    flex-direction: row;
}
```

![image-20211202120315416](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202120315416.png)

但是$Person\ Wealth$这两个单词应该是一左一右,而且是左边更突出

这个也可以对外层的$h2$标签套一个$flex$布局,主轴为横轴,设置为两端对齐

```css
h2{
    background-color: #fff;
    border-bottom: 1px solid #111;
    padding: 10px;
    display: flex; 
    justify-content: space-between;
    font-weight: 300;
    margin: 20px 0 0;
}
```



![image-20211202121251592](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202121251592.png)

接下来大概布局就完成了,设置一些宽度大小,内外边距就大概完成了。

接下来可以给按钮用$js$绑定一些事件,比如点击$add\ User$右边就会出现一个人的信息



![image-20211202121420288](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20211202121420288.png)

其实就是用$js$给右边的$main$标签内添加若干个$div$标签

$js$部分比较简单就不写了.