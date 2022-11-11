<!DOCTYPE HTML>
<html><head>
        <meta name="description" content="Desing life Perfil"/>
        <meta name="keywords" content="Desing life, perfil, Edison Ospina Corredor, Diseño portafolio"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Edison Vidal Ospina Corredor</title>
        <link rel="shortcut icon" href="../logoDesigingLife.ico">
	</head>

	<body>  
		<div id="container" itemscope itemtype="http://www.data-vocabulay.org/Person">
            <div id="contenidoContacto">
                	<?php
                        // aqui van las variables 
                        
                        $nombre = $_POST["nombre"];
                        $mail = $_POST["email"];
                        $mensaje = $_POST["mensaje"];
                        // aqui las muestro en el nabegador 
                        
                        echo "<h1>El mesaje que has enviado es:</h1>";
                        echo "<br />";
                        echo "Nombre: ";
                        echo $nombre;
                        echo "<br />";
                        echo "Email: ";
                        echo $mail;
                        echo "<br />";
                        echo "Mensaje: ";
                        echo $mensaje;

                        $aquien ="edisonv16@hotmail.com";
                        $asunto ="Has recivido un mensaje de la página";
                        $mensajemail = $nombre." Con el email " .$mail." Mensaje: ".$mensaje;    
                        if(mail ($aquien,$asunto,$mensajemail))
                        {echo "tu nensaje se ha enviado correctamente";}
                        else{"El envio del mail ha fallado";}
                    ?>
            </div>
		  </div>
    </div>
    </body>
</html>
        

