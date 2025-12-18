package transfer;


import com.intuit.karate.junit5.Karate;

class TransferRunner {
    @Karate.Test
    Karate testTransfer() {
        return Karate.run("classpath:transfer/transfer.feature").relativeTo(getClass());
    }
}
