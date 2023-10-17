package cs2810.group30.oaxacabackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Timestamp;

/**An Order object, uses any number of orderItems and fields.
 *
 * @author Mostafa
 */
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private int tableNo;
    private Timestamp timeOfOrder;
    private String completionStatus;
    private float price;
    private String waiter;
    private Boolean isPaid;

    /**Empty constructor used by autowirer
     *
     */
    public Orders(){
        this.isPaid = false;
    }

    /**Full Constructor, taking a String id, int tableNo, timestamp timeOfOrder, String completionStatus and float price.
     *
     * @param id the id of the model (usually autogenerated).
     * @param tableNo the int representing the table that the order belongs to.
     * @param timeOfOrder a timestamp of when the order was placed.
     * @param completionStatus a sting representing the status the order is in (pending, confirmed completed etc).
     * @param price a float representing the price when the order was placed.
     * @param waiter the name of the waiter handling this order.
     */
    public Orders(String id, int tableNo, Timestamp timeOfOrder, String completionStatus, float price, String waiter){
        this.id = id;
        this.tableNo = tableNo;
        this.timeOfOrder = timeOfOrder;
        this.completionStatus = completionStatus;
        this.price = price;
        this.waiter = waiter;
        this.isPaid = false;
    }

    public Timestamp getTimeOfOrder() {
        return timeOfOrder;
    }

    public void setTimeOfOrder(Timestamp timeOfOrder) {
        this.timeOfOrder = timeOfOrder;
    }

    public String getCompletionStatus() {
        return completionStatus;
    }

    public int getTableNo() {
        return tableNo;
    }

    public void setTableNo(int tableNo) {
        this.tableNo = tableNo;
    }

    public void setCompletionStatus(String completionStatus) {
        this.completionStatus = completionStatus;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Id
    public String getId() {
        return id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getWaiter() {
        return waiter;
    }

    public void setWaiter(String waiter) {
        this.waiter = waiter;
    }

    public Boolean getPaid() {
        return isPaid;
    }

    public void setPaid(Boolean paid) {
        isPaid = paid;
    }
}
