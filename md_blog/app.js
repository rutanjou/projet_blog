(function(){
    console.log('hello world')
    var app = {
        menu : null,
        init(){
            this.requestMenu();
        },
        listener(){
            $('a').on('click',app.seeArticle);
        },
        generateMenu(){     
            for(var i=0; i < app.menu.menu.length;i++){
                $('ul').append('<li ><a data-article='+i+'  href="#">'+ app.menu.menu[i].title +'</a></li>');
            }
        },
        seeArticle(){
            console.log('lala')
            app.requestArticleMd(app.menu.menu[$(this).data('article')].path);
        },
        requestArticleMd(article){
            $.ajax({
                url:'http://192.168.2.33:2000/'+article
            }).done(function(data){
                var converter = new showdown.Converter(),
                html = converter.makeHtml(data);
                $('#md').html(html)
            })
        },
        requestMenu(){
            $.ajax({
                url:'http://192.168.2.33:2000/menu.json'
            }).done(function(data){
                
                app.menu = data
                console.log(data)
                app.generateMenu();
                app.listener();
            })
        }
    }
    
    app.init()
})();