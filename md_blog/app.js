(function(){
    var app = {
        menu:null, 
        path: null,
        init : function(){
            this.getMenu.call(this);
    
        },
        getMenu : function(){
            $.ajax({
                url:'http://localhost:2000/menu.json'
            }).done(this.doneRequestMenu.bind(this))
        },
        doneRequestMenu:function(resp){
            this.menu = resp;   
            this.makeMenu.call(this);
            this.listener.call(this)  
        }, 
        makeMenu:function(){
            for ( var i = 0 ; i < this.menu.menu.length; i++ ){
                $("#menu").append("<li><a class='blog' href='#' data-path='"+this.menu.menu[i].path+"'>" + this.menu.menu[i].title + "</a></li>"); 
            }
        
        },
        listener:function(){
            $('.blog').on('click',this.updateView);
        },
        updateView:function(){
            app.path=$(this).data('path');
            app.getArticle();
        },
        getArticle:function(){
            $.ajax({
                url:'http://localhost:2000/'+app.path
            }).done(app.doneRequestArticle)
        },
        doneRequestArticle:function(resp){
                console.log(resp);
                var converter = new showdown.Converter();
                var html = converter.makeHtml(resp);
                $('#md').html(html);
        }
    }
    app.init();
})();