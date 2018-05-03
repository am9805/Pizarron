/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.server;

import com.udea.pizarronrows.Figure;
import com.udea.pizarronrows.FigureDecoder;
import com.udea.pizarronrows.FigureEncoder;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.json.JsonObject;
import javax.json.spi.JsonProvider;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import static jdk.nashorn.internal.runtime.Debug.id;

/**
 *
 * @author Asus
 */
@ServerEndpoint(value="/echo", 
        encoders = {FigureEncoder.class},
        decoders= {FigureDecoder.class}
        )
public class Pizarron {
    
    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void broadcastFigure(Figure figure, Session session) throws IOException, EncodeException{
        for(Session peer:peers){
            if(!peer.equals(session)){
                peer.getBasicRemote().sendObject(figure);
            }
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
    
   
}