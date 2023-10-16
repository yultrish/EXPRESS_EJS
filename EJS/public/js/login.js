const btn = document.querySelector('.submit');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    
   let url = '/home?username=yultrish';
   let url2 = 'http://localhost:4004/home?username=yultrish';
   console.log(url)
   window.location.href = url;
   

});

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})
