
package com.udea.pizarronrows;

import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

 /** Esta clase es la encargada de decodificar los mensajes del websocket a la 
 * clase POJO Figure.
 * @author Asus
 */
public class FigureDecoder implements Decoder.Text<Figure>{

    /**
     * Este médoto se encarga de retornar un objeto tipo Figure a partir de un 
     * String de datos que entra como parámetro y su finalidad es tomarlo como 
     * un JsonObject y decodificarlo como un objeto Figure.
     * @param string
     * @return
     * @throws DecodeException 
     */
    @Override
    public Figure decode(String string) throws DecodeException {
        JsonObject jsonObject = Json.createReader(new StringReader(string)).readObject();
        return new Figure(jsonObject);
    }
    
    /**
     * Retorna un booleano que verifica si es posible decodificar el mensaje que
     * llega y lanza una excepción en caso de que ocurra un error en este proceso,
     * @param string
     * @return 
     */
    @Override
    public boolean willDecode(String string) {
        try{
            Json.createReader(new StringReader(string)).readObject();
            return true;
        }catch(JsonException e){
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * Este método se encarga de dar aviso si se da inicio a un proceso de
     * codificación
     * @param config 
     */
    @Override
    public void init(EndpointConfig config) {
        System.out.println("Init");}
    
    /**
     * Este método se encarga de dar aviso si se ha terminado un proceso de
     * codificación
     */
    @Override
    public void destroy() {
        System.out.println("Destroy");
    }
    
}
