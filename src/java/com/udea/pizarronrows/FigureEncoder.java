package com.udea.pizarronrows;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
/**
 * Esta clase es la encargada de codificar a Figure como un
 * string JSON para enviarlo al endpoint
 * @author Asus
 */
public class FigureEncoder implements Encoder.Text<Figure>{
    
    /**
     * Codifica el mensaje que llega como parametro a un formato
     * JSON
     * @param figure
     * @return
     * @throws EncodeException 
     */
    @Override
    public String encode(Figure figure) throws EncodeException {
        return figure.getJson().toString();
    }
    
    /**
     * Este método se encarga de dar aviso si se da inicio a un proceso de
     * codificación
     * @param config 
     */
    @Override
    public void init(EndpointConfig config) {
        System.out.println("Init");
    }
    
    /**
     * Este método se encarga de dar aviso si se ha terminado un proceso de
     * codificación
     */
    @Override
    public void destroy() {
        System.out.println("Destroy");
    }
    
}
