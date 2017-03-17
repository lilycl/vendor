<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1">
  <title>
    <%= htmlWebpackPlugin.options.params.title %>
  </title>

  <script>
    window.c = function(a){console.log(a)}
    window._c = function(a){
      alert(JSON.stringify(a).replace(/\,/g, ",\n"))
    }
    window._C = function(a){_c(a);}
  </script>
</head>

<body>
  <div id="root"></div>
</body>

</html>